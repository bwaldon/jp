library(tidyverse)
library(jsonlite)
library(binom)
library(brms)

base = 6
expand = 4
setwd(dirname(rstudioapi::getActiveDocumentContext()$path))

d_subj <- read_csv("../../../results/pilots/vehicle/vehiclepilot-subject_information.csv") %>%
  select(workerid, attention, language)

d_data <- read_csv("../../../results/pilots/vehicle/vehiclepilot-trials.csv") %>%
  filter(!is.na(item)) %>%
  mutate(population_judgment = as.numeric(population_judgment))

d <- d_subj %>%
  bind_cols(d_data) %>%
  mutate(workerid = workerid...1) %>%
  # NATIVE LANGUAGE AND RESPONSE > 100 EXCLUSION (MANUAL)
  filter(!(workerid %in% c(61, 146))) %>%
  filter(attention == TRUE) %>%
  distinct(workerid, .keep_all = TRUE)

d %>%
  group_by(item) %>%
  summarize(n = n())

transformed <- d %>%
  group_by(item) %>%
  mutate(sum = n()) %>%
  ungroup() %>%
  group_by(item,individual_judgment) %>%
  mutate(n = n(), actual = (n / sum) * 100) 

correlation = round(cor(transformed$actual, transformed$population_judgment), digits = 3)

ggplot(data = transformed, aes(x = actual, y = population_judgment, 
                              color = individual_judgment)) +
  geom_point() +
  theme_bw() +
  ylab("Estimated percentage\nof agreement (of 100)") +
  xlab("Observed percentage of agreement") +
  labs(color = "Judgment type") +
  theme(legend.position = "bottom",
        text = element_text(size = base * expand / 2, face = "bold")) + 
  ggtitle("Estimated vs. observed consensus")  +
  annotate(geom = "text", x = 90, y = 20, label = paste("r =", correlation, sep = " ")) +
  geom_smooth(method='lm') +
  xlim(0, 100) +
  ylim(0, 100)

d %>%
  group_by(item, individual_judgment) %>%
  summarize(judgment_mean = mean(population_judgment)) %>%
  ggplot(aes(factor(-judgment_mean), y = judgment_mean, fill = item)) +
  facet_wrap(~individual_judgment,scales = "free_x", drop = TRUE) +
  geom_bar(stat = "identity", position = "dodge") +
  theme_bw()

ggsave("pilot_results.pdf", width = 6, height = 3, units = "in")

m <- brm(population_judgment ~ actual + (individual_judgment|item), data = transformed,
         control = list(adapt_delta = 0.9))

summary(m)

hypothesis(m, "actual > 0")
