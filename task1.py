path = "houseSales.tsv"

with open(path) as file:
    
    X = []
    Y = []
    n = 0
    
    while True:
        line = file.readline()
        
        line = line.strip()
        
        if (line == ''):
            break
        
        line = line.split('\t')
        
        X.append(float(line[0]))
        Y.append(float(line[1]))
        
        n += 1
    
    X_mean = sum(X) / n
    Y_mean = sum(Y) / n
    
    X_square = sum([i*i for i in X])
    X_Y = sum([(X[i] * Y[i]) for i in range(n)])
    
    m = (X_Y - n * X_mean * Y_mean) / (X_square - n * X_mean**2)
    c = Y_mean - m * X_mean
    
    e = 0
    for i in range(n):
        predict = m * X[i] + c
        e += (predict - Y[i])**2
    
    print("Gradient:   \t", m)
    print("Y-Intercept:\t", c)
    print()
    print("Total Error:\t", e)
    print("Mean Square:\t", e/n)