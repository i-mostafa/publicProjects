import math
import os
import random
import sys
import simpy
import yaml

from .BaseStation import BaseStation
from .Client import Client
from .Coverage import Coverage
from .Distributor import Distributor
from .Graph import Graph
from .Slice import Slice
from .Stats import Stats

from .utils import KDTree


class SliceManager:
    def __init__(self, inputFile, env):

        CONF_FILENAME = os.path.join('', inputFile)
        try:
            with open(CONF_FILENAME, 'r') as stream:
                data = yaml.load(stream, Loader=yaml.FullLoader)
        except FileNotFoundError:
            print('File Not Found:', CONF_FILENAME)
            exit(0)
        random.seed()
        self.env = env
        self.lastData = data
        self.SETTINGS = data['settings']

        self.SLICES_INFO = data['slices']
        self.NUM_CLIENTS = self.SETTINGS['num_clients']
        self.MOBILITY_PATTERNS = data['mobility_patterns']
        self.BASE_STATIONS = data['base_stations']
        self.CLIENTS = data['clients']
        self.N_BASE_STATIONS = len(self.BASE_STATIONS)
        self.N_SLICES = len(self.SLICES_INFO)

        collected, self.slice_weights = 0, []
        for __, s in self.SLICES_INFO.items():
            collected += s['client_weight']
            self.slice_weights.append(collected)

        collected, self.mb_weights = 0, []
        for __, mb in self.MOBILITY_PATTERNS.items():
            collected += mb['client_weight']
            self.mb_weights.append(collected)

        mobility_patterns = []
        for name, mb in self.MOBILITY_PATTERNS.items():
            mobility_pattern = Distributor(name, self.get_dist(mb['distribution']), *mb['params'])
            mobility_patterns.append(mobility_pattern)

        usage_patterns = {}
        for name, s in self.SLICES_INFO.items():
            usage_patterns[name] = Distributor(name, self.get_dist(s['usage_pattern']['distribution']),
                                               *s['usage_pattern']['params'])

        self.base_stations = []
        i = 0
        for b in self.BASE_STATIONS:
            slices = []
            ratios = b['ratios']
            capacity = b['capacity_bandwidth']
            for name, s in self.SLICES_INFO.items():
                s_cap = capacity * ratios[name]
                # TODO remove bandwidth max
                s = Slice(name, ratios[name], 0, s['client_weight'],
                          s['delay_tolerance'],
                          s['qos_class'], s['bandwidth_guaranteed'],
                          s['bandwidth_max'], s_cap, usage_patterns[name])
                s.capacity = simpy.Container(self.env, init=s_cap, capacity=s_cap)
                slices.append(s)
            base_station = BaseStation(i, Coverage((b['x'], b['y']), b['coverage']), capacity, slices)
            self.base_stations.append(base_station)
            i += 1

        ufp = self.CLIENTS['usage_frequency']
        self.usage_freq_pattern = Distributor(f'ufp', self.get_dist(ufp['distribution']), *ufp['params'],
                                         divide_scale=ufp['divide_scale'])

        self.x_vals = self.SETTINGS['statistics_params']['x']
        self.y_vals = self.SETTINGS['statistics_params']['y']
        self.stats = Stats(self.env, self.base_stations, None, ((self.x_vals['min'], self.x_vals['max']),(self.y_vals['min'], self.y_vals['max'])))

        self.clients = []
        for i in range(self.NUM_CLIENTS):
            loc_x = self.CLIENTS['location']['x']
            loc_y = self.CLIENTS['location']['y']
            location_x = self.get_dist(loc_x['distribution'])(*loc_x['params'])
            location_y = self.get_dist(loc_y['distribution'])(*loc_y['params'])

            mobility_pattern = self.get_random_mobility_pattern(self.mb_weights, mobility_patterns)

            connected_slice_index = self.get_random_slice_index(self.slice_weights)
            c = Client(i, self.env, location_x, location_y,
                       mobility_pattern, self.usage_freq_pattern.generate_scaled(), connected_slice_index, self.stats)
            self.clients.append(c)

        KDTree.limit = self.SETTINGS['limit_closest_base_stations']
        KDTree.run(self.clients, self.base_stations, 0)

        self.stats.clients = self.clients

        # self.env.process(self.stats.collect())

        self.xlim_left = int(self.SETTINGS['simulation_time'] * self.SETTINGS['statistics_params']['warmup_ratio'])
        self.xlim_right = int(self.SETTINGS['simulation_time'] * (1 - self.SETTINGS['statistics_params']['cooldown_ratio'])) + 1

    def get_dist(self, d):
        return {
            'randrange': random.randrange,  # start, stop, step
            'randint': random.randint,  # a, b
            'random': random.random,
            'uniform': random,  # a, b
            'triangular': random.triangular,  # low, high, mode
            'beta': random.betavariate,  # alpha, beta
            'expo': random.expovariate,  # lambda
            'gamma': random.gammavariate,  # alpha, beta
            'gauss': random.gauss,  # mu, sigma
            'lognorm': random.lognormvariate,  # mu, sigma
            'normal': random.normalvariate,  # mu, sigma
            'vonmises': random.vonmisesvariate,  # mu, kappa
            'pareto': random.paretovariate,  # alpha
            'weibull': random.weibullvariate  # alpha, beta
        }.get(d)

    def get_random_mobility_pattern(self, vals, mobility_patterns):
        i = 0
        r = random.random()

        while vals[i] < r:
            if i >= len(vals) - 1:
                break
            i += 1

        return mobility_patterns[i]

    def get_random_slice_index(self, vals):
        i = 0
        r = random.random()
        while vals[i] < r:
            if i >= len(vals) - 1:
                break
            i += 1
        return i

    def sdn(self):
        data = self.lastData
        self.SETTINGS = data['settings']
        self.SLICES_INFO = data['slices']
        self.NUM_CLIENTS = self.SETTINGS['num_clients']
        self.MOBILITY_PATTERNS = data['mobility_patterns']
        self.BASE_STATIONS = data['base_stations']
        self.CLIENTS = data['clients']
        self.N_BASE_STATIONS = len(self.BASE_STATIONS)
        self.N_SLICES = len(self.SLICES_INFO)
