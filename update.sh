#!/usr/bin/env bash

# 更新 sitemap
python3 gen_sitemap.py

if [ -n "$1" ]
then
    # 上传到github
    git add *
    git commit -m "`date +'%y-%m-%d %H:%M:%S'` $1"
    git push -u origin master

else
    echo "必须输入一个参数！！"
fi
