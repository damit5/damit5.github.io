#!/usr/bin/env python

import os
import subprocess
import datetime

def generate_sitemap():
    # 使用find命令获取所有HTML文件的路径
    cmd = 'find . -name "*.html" -type f'
    html_files = subprocess.check_output(cmd, shell=True).decode().split('\n')[:-1]

    # 获取当前日期
    today = datetime.date.today().isoformat()

    # 生成sitemap.xml文件
    with open('sitemap.xml', 'w') as f:
        f.write('<?xml version="1.0" encoding="UTF-8"?>\n')
        f.write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n')

        for html_file in html_files:
            # 获取相对路径并生成每个HTML文件的URL
            url = f'<url>\n'
            url += f'    <loc>https://blog.gm7.org/{html_file[2:]}</loc>\n'
            url += f'    <lastmod>{today}</lastmod>\n'
            url += f'    <changefreq>always</changefreq>\n'
            url += f'    <priority>0.8</priority>\n'
            url += f'</url>\n'

            f.write(url)

        f.write('</urlset>')

if __name__ == '__main__':
    generate_sitemap()
