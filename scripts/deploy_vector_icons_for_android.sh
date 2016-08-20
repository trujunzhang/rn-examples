#!/bin/bash

bg_src=build.gradle
bg_dest=../node_modules/react-native-vector-icons/android/

if [ ! -d "$bg_dest" ]; then
  mkdir -p "$bg_dest"
fi
cp -R "$bg_src" "$bg_dest"