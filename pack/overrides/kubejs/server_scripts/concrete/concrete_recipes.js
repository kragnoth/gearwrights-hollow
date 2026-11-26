ServerEvents.recipes(event => {

    // gravel + clay + hemp fiber -> hempcrete pile
    event.shapeless(
        'arkaneworx:hempcrete_pile',
        [
            'minecraft:gravel',
            '#c:clay',
            'immersiveengineering:hemp_fiber'
        ]
    ).id('arkaneworx:hempcrete_mix')

    // gravel + clay -> concrete pile
    event.shapeless(
        'arkaneworx:concrete_pile',
        [
            'minecraft:gravel',
            '#c:clay'
        ]
    ).id('arkaneworx:concrete_mix')

    // Splashing: plain concrete pile -> IE Concrete
    event.custom({
        type: 'create:splashing',
        ingredients: [
            { item: 'arkaneworx:concrete_pile' }
        ],
        results: [
            { id: 'immersiveengineering:concrete', count: 1 }
        ]
    }).id('arkaneworx:concrete_splashing')

    // Splashing: hempcrete pile -> IE Hempcrete
    event.custom({
        type: 'create:splashing',
        ingredients: [
            { item: 'arkaneworx:hempcrete_pile' }
        ],
        results: [
            { id: 'immersiveengineering:hempcrete', count: 1 }
        ]
    }).id('arkaneworx:hempcrete_splashing')
})
