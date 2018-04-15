/**
 * Created by hunter on 2017/9/19.
 */

module.exports = {
    'GET /searchbar': async (ctx, next) => {
        ctx.render('searchBar.html', {
            name: 'searchBar'
        });
    },
    'GET /oopdialog': async (ctx, next) => {
        ctx.render('oopDialog.html', {
            name: 'oopDialog'
        });
    }
};