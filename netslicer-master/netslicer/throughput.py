def calcThroughput(v, qm, f, bw, u, oh):
    rMax = 948/1024
    nPrb = bw * 12 / (pow(10, -3) / (14 * pow(2, u)))
    result = v * qm * f * rMax * nPrb * (1 - oh)
    return result * pow(10, -6)


print(calcThroughput(4, 8, 1, 273, 1, .14))
