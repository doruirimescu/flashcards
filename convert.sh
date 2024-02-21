#!/bin/bash

find . -type f -name '*.png' -exec mogrify -format jpg {} \; -exec rm {} \;
