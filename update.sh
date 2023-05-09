#!/usr/bin/env bash

# 更新 sitemap
python3 gen_sitemap.py

if [ -n "$1" ]
then
    # 上传到github
    git add *
    git commit -m "`date +'%y-%m-%d %H:%M:%S'` $1"
    # 更新 更新日志.html，增加最新的commit
    latest_commit=$(git log -1 --format="%H")
    last_h2=$(awk '/<\/h2>/{line=$0} END{print line}' 更新日志.html)
    last_h2_modify=$(echo $last_h2 | sed "s|</h2>|<a href='https://github.com/damit5/damit5.github.io/commit/$latest_commit'><img src='https://img.shields.io/github/last-commit/damit5/damit5.github.io'></a></h2>|g")
    # 这两条命令有区别吗？？？为啥结果差这么多
    # sed -i '' "s@$last_h2@$last_h2_modify@g" 更新日志.html
    perl -pi -e "s|$last_h2|$last_h2_modify|g" 更新日志.html
    git add 更新日志.html
    git commit -m "`date +'%y-%m-%d %H:%M:%S'` 同步更新日志"
    # push
    git push -u origin master

else
    echo "必须输入一个参数！！"
fi
