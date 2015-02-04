![](https://raw.githubusercontent.com/globalresiliencepartnership/globalresiliencepartnership.github.io/master/img/logos/grp-color.png)

### Global Resilience Partnership website

The site runs on `jekyll`:

1. Follow http://jekyllrb.com/docs/installation/ to install.
2. Run `jekyll serve -w` to live load the site. The default port is 4000.

Site uses `sass` and `compass` for css compilation:

1. Follow http://sass-lang.com/install to install `sass`.
2. Follow http://compass-style.org/install/ to install `compass`.
3. Run `compass watch` to live load changes from `source_assets/styles/*.sass`, the file that should be edited for style changes.

> Compass will compile the files to `_includes/styles` where other css files are. Then though jekyll includes all files are merged into `assets/styles/style.css`
