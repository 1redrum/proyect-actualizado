"""Render the shared Pricing partial into both static pages; no dependencies."""
from pathlib import Path
import re
import runpy

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / 'public'
runpy.run_path(str(ROOT / 'scripts/render-assets.py'))
START, END = '<!-- PRICING:START -->', '<!-- PRICING:END -->'
source = (ROOT / 'components/pricing.html').read_text()

def pricing(standalone=False):
    values = dict(
        variant='pricing--standalone' if standalone else 'pricing--home',
        heading=('<h1 id="pricing-title">The cheapest upgrade you\'ll ever buy.</h1><p>Hypertune is fully supported by every top anti-cheat.<br />Get more frames, smoother gameplay, and less lag.</p>' if standalone else '<p class="pricing__eyebrow">Pricing</p><h2 id="pricing-title">Next level power is one click away.</h2>'),
        mobile_heading='<h2 class="pricing__mobile-title">Next level power is<br /> one click away.</h2>' if standalone else '<p class="pricing__mobile-title" aria-hidden="true">Next level power is<br /> one click away.</p>',
        panel_subtitle="Unlock your PC's Performance" if standalone else 'Get Hypertune',
        old_price='<del>$119.88</del>' if standalone else '',
        overclocking='Smart Overclocking' if standalone else 'Auto CPU/GPU Overclocking',
        action=('<button type="button" class="btn-silver__inner" disabled title="Purchases are unavailable in this preview" aria-describedby="pricing-preview">Boost my performance</button>' if standalone else '<a class="btn-silver__inner" href="/pricing" data-pricing-link>Unlock your Performance</a>'),
        footnote=('<p class="pricing__guarantee">Cancel anytime. 7 day money-back guarantee</p><p id="pricing-preview" class="sr-only">Pricing preview. Purchases are unavailable.</p>' if standalone else '<p class="pricing__team"><span>Want Hypertune for the whole team?</span> <a href="https://discord.com/invite/hypertune">Contact Us.</a></p>')
    )
    return re.sub(r'{{(\w+)}}', lambda m: values[m[1]], source).rstrip()

home_path = PUBLIC / 'index.html'
home = home_path.read_text()
partial = START + '\n' + pricing() + '\n      ' + END
if START in home:
    home = re.sub(re.escape(START) + r'.*?' + re.escape(END), lambda _: partial, home, flags=re.S)
else:
    marker = '      <!-- ===================== HOW IT WORKS ===================== -->'
    assert marker in home
    home = home.replace(marker, '      ' + partial + '\n' + marker)
home_path.write_text(home)

# Reuse the existing head and Navbar/menu, rather than maintain a second copy.
head = home[:home.index('<body>')]
head = re.sub(r'<title>.*?</title>', '<title>Pricing — Hypertune</title>', head)
head = re.sub(r'<meta name="description" content="[^"]*" />', '<meta name="description" content="Hypertune plans: $69.99 yearly or $9.99 monthly. Compare PC optimization features." />', head)
nav = home[home.index('    <!-- ===================== NAVBAR'):home.index('    <main')]
nav = re.sub(r'href="#([^"]+)"', r'href="/#\1"', nav).replace(' data-scroll-top', '')
page = head + '<body>\n  <div class="page">\n' + nav + '    <main class="main">\n' + pricing(True) + '\n    </main>\n  </div>\n</body>\n</html>\n'
(PUBLIC / 'pricing').mkdir(exist_ok=True)
(PUBLIC / 'pricing/index.html').write_text(page)
print('Rendered Pricing into public/index.html and public/pricing/index.html')
