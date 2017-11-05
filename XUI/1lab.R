require(MASS)

n <- 10000
a <- c(1, -1)
r <- cbind(c(16, -15), c(-15, 16))

analyse_cor <- function(x, y) {
  print(cor.test(x, y))
  dev.new()
  plot(x, y)
}

fileName = "/home/panteleev/Documents/Maga/XUI/iris.data.txt"
irisData <- read.table(fileName, header = FALSE, sep = ",")

head(irisData)

analyse_cor(irisData$V1, irisData$V2)

samopalData <- mvrnorm(n, a, r)

head(samopalData)

analyse_cor(samopalData[,1], samopalData[,2])
