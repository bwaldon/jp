library(tidyverse)
library(jsonlite)

stims <- toJSON(read.csv("stimuli.csv"))

code <- paste("var stimuli =", stims, sep = " ")

write_file(code, "js/stimuli.js")