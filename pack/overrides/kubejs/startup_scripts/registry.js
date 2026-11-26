// kubejs/startup_scripts/zinc_dust.js
StartupEvents.registry('item', event => {
    // Register zinc_dust
    event.create('arkaneworx:zinc_dust')
    .displayName('Zinc Dust')
    .tag('c:dusts')
    .tag('c:dusts/zinc');

    event.create('arkaneworx:concrete_pile')
    .displayName('Pile of Concrete Dust');

    event.create('arkaneworx:hempcrete_pile')
    .displayName('Pile of Hempcrete Dust');
});
