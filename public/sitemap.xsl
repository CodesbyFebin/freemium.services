<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
	<xsl:template match="/">
		<html xmlns="http://www.w3.org/1999/xhtml">
			<head>
				<title>XML Sitemap | Freemium Services</title>
				<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
				<style type="text/css">
					body { font-family: 'Inter', sans-serif; background: #080B10; color: #E8F0F8; margin: 0; padding: 2rem; }
					h1 { font-family: 'Syne', sans-serif; color: #00D4FF; letter-spacing: -1px; }
					table { width: 100%; border-collapse: collapse; margin-top: 2rem; background: #141C26; border-radius: 8px; overflow: hidden; }
					th { background: #1A2332; color: #00D4FF; text-align: left; padding: 12px; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; }
					td { padding: 12px; border-bottom: 1px solid #1E2D40; font-size: 0.9rem; }
					tr:hover td { background: #1E2D40; }
					a { color: #00FF88; text-decoration: none; }
					a:hover { text-decoration: underline; }
					.priority { font-weight: bold; color: #FFD60A; }
				</style>
			</head>
			<body>
				<h1>Freemium Services Sitemap</h1>
				<p>This is a PHP/AI-optimized XML sitemap for search engines like Google and Bing.</p>
				<table>
					<tr>
						<th>URL</th>
						<th>Priority</th>
						<th>Change Freq</th>
						<th>Last Mod</th>
					</tr>
					<xsl:for-each select="sitemap:urlset/sitemap:url">
						<tr>
							<td>
								<a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
							</td>
							<td>
								<span class="priority"><xsl:value-of select="sitemap:priority"/></span>
							</td>
							<td>
								<xsl:value-of select="sitemap:changefreq"/>
							</td>
							<td>
								<xsl:value-of select="sitemap:lastmod"/>
							</td>
						</tr>
					</xsl:for-each>
				</table>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
