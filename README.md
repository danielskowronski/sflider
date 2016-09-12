# sflider
as simple as possible jQuery based slider with mavigation

### goals
- many automagic and minimum config
- simple transitions only (lightweight)
- content of slide cany be any html div

### features
- changing slides every configured time period
- navigation buttons
- pause changing when hovered (including manual navigation via buttons)

### usage
1. include **sflider.css** and **sflider.js**
2. create JS object with at least two fields:
   - **height** (taking any CSS-friendly format) and
   - **timeout** - number of milliseconds between slides changes
3. after DOM is created (jQuery [ready event](https://api.jquery.com/ready/)) execute **_invokeSflider** functiuon with 2 params:
   - first - config object
   - second - jQeury object of slider container
4. slider container needs to have at least **.sflider-slides** div containing one or more **.sflider-slide** divs with any content
5. to change slide execute **_moveSflider** with params:
    - **offset** - any number (negative changes slides backwards)
    - *optional **force*** - should hover over object be ignored (eg. clicking button that is located on main slider div)

refer to **examples/** directory
