import math

path = "dollar.tsv"

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
    
    if path == "houseSales.tsv":
    
        min_m = m = 0
        min_c = c = -10
        c_limit = 10
        m_limit = 0.5
        min_e = math.inf
    
    else:
        
        min_m = m = 0
        min_c = c = -6000
        c_limit = -4000
        m_limit = 5
        min_e = math.inf
    
    while c != c_limit:
        while m != m_limit:
            
            c = round(c, 2)
            m = round(m, 2)
            error = 0
            
            for i in range(n):
                predict = m*X[i] + c
            
                error += (predict - Y[i])**2
                
            # f = open("DollarsDataReport.txt", "a")
            # f.write(str(round(m, 2)) + '\t' + str(round(c, 2)) + '\t' + str(round(error, 1)) + '\n')
            
            if error < min_e:
                min_e = error
                min_m = m
                min_c = c
    
            m += 0.01
            
        m = 0
        c += 0.05
    
    print("Gradient:   \t", min_m)
    print("Y-Intercept:\t", min_c)
    print()
    print("Total Error:\t", min_e)
    print("Mean Square:\t", min_e/n)
    