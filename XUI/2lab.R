analyse_regression <- function(x, y) {
  model <- lm(y ~ x)
  print(summary(model))
  dev.new()
  plot(x, y)
  abline(model)
}
fileName = "/home/panteleev/Documents/Maga/XUI/iris.data.txt"
irisData <- read.table(fileName, header = FALSE, sep = ",")
head(irisData)
analyse_regression(irisData$V1, irisData$V2)

n <- 10000
a <- -10
b <- -10
s2 <- 1
x <- seq(0.0, 1.0, length=n)
y <- a * x + b + rnorm(n, 0, s2)
analyse_regression(x, y)
