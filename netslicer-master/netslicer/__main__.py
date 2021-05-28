
import sys

from .Graph import Graph
from .SliceManager import SliceManager



if len(sys.argv) != 2:
    print('Please type an slice number.')
    print('python -m netslicer <slicenumber>')
    exit(1)

import simpy
env = simpy.Environment()

# x_mMTCSliceManager = SliceManager('x_mMTC.yml', env)

sliceManager = ''
if sys.argv[1] == '1':
    sliceManager = SliceManager('x_eMBB.yml', env)
else:
    sliceManager = SliceManager('x_mMTC.yml', env)

# x_mMTCSliceManager.env.process(x_mMTCSliceManager.stats.collect())
sliceManager.env.process(sliceManager.stats.collect())

env.run(until=int(sliceManager.SETTINGS['simulation_time']))
#
# print(x_eMBBSliceManager.base_stations)
graph = Graph(sliceManager.base_stations, sliceManager.clients,
              (sliceManager.xlim_left, sliceManager.xlim_right),
              ((sliceManager.x_vals['min'], sliceManager.x_vals['max']),
               (sliceManager.y_vals['min'], sliceManager.y_vals['max'])),
              output_dpi=sliceManager.SETTINGS['plotting_params']['plot_file_dpi'],
              scatter_size=sliceManager.SETTINGS['plotting_params']['scatter_size'],
              output_filename=sliceManager.SETTINGS['plotting_params']['plot_file'])
graph.draw_all(*sliceManager.stats.get_stats())
graph.save_fig()
# # graph.show_plot()

sys.stdout = sys.__stdout__
print('Simulation has ran completely and output file created to:', 'output.txt')


