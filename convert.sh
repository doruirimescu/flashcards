#!/bin/bash

find . -maxdepth 1 -type f -name '*.png' -exec mogrify -format jpg {} \; -exec rm {} \;
