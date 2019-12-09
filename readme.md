# UNDP static site template
## based on [Zurbe Foundation template](https://github.com/zurb/foundation-zurb-template)

## Installation

To use this template, your computer needs:

- [NodeJS](https://nodejs.org/en/)
- [Git](https://git-scm.com/)

### Manual Setup

To manually set up the template, create project folder, switch to it and create default project.json file (it will replaced later):

```bash
md projectname
cd projectname
npm init -y
```

Create new file named `.npmrc` containing path to the UNDP GitHub package repo:

```
registry=https://npm.pkg.github.com/undp
```

Install and deploy boilerplate template:

```
npm install @undp/foundation-zurb-template --save-dev
```

Install templates dependencies:

```
npm install
```
