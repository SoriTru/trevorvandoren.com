#!/bin/bash
# A script to send recieved form data to my email
# 
# input 1: name
# input 2: phone
# input 3: message
# input 4: email
#
# Trevor VanDoren - Jan 2020

CONTENT="To: vandorentrevor@gmail.com
Subject: Gutters for ${1:-'blank'}
Phone - ${2:-'blank'}
Email - ${4:-'blank'}
Message - ${3:-'blank'}"

echo "$CONTENT" | sendmail -vt

