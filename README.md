# challenge-form3
> Paqui Calabria Rubio

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Technical decisions

### Tailwind

I have used Tailwind directly in components because it allows a rapid development flow. For a bigger or longer project you'd want to have some sort of components/styles library, which could be built with Tailwind (using any of the strategies described [here](https://tailwindcss.com/docs/extracting-components)) or not.

### Mixins

I have tried to encapsulate business logic into mixins, which gives great flexibility for unit testing (you could check the exported object directly if the vue instance is not important or use it on a mock component). This makes the components much simpler, but also presents the problem of having props, methods, etc defined "magically".

It could be solved with the composition API (which i decided not to use since I'm not very familiar with it yet).

### Testing

I decided not to test "trivial" code in the unit tests (like computed properties that modify style, etc) and also not to check in components functionality that is tested on mixins, to avoid repetition. Of course this is not maintenable for big/complex projects.

For this strategy to work in that case, it will need more extensive integration (I mean "real" integration testing and not just snapshots) and e2e testing.

About the integration testing, I'm not a fan of snapshot testing in general, and I prefer to use automated visual testing instead, but this was faster.

### Branching

I haven't used branches because I didn't saw it necesary, due to me being the only developer in a project with features simple enough to be fitted in one or two commits and no parallel work required. Of course I know how to use branches, do PR, best practices, etc
