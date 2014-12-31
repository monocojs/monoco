/**
 * Example 12 - Create a one to many relashionship
 *  
 */


// create the system
monoco.system('example12');

// create the model
var metamodel = monoco.require('metamodel');

metamodel.type({
    'name': 'sex',
    'type': 'string',
    'value': ['male', 'female']
});

metamodel.schema({
    '_name': 'JediSchema',
    'description': 'string',
    'children': 'collection', // create the link at metaclass level
    'sex': 'property',
    'firstName': 'property',
    'lastName': 'property',
    'father': 'property'
});

metamodel.schema({
    '_name': 'Jedi',
    '_schema': 'JediSchema',
    'description': 'a jedi',
    'sex': {
        'type': 'sex',
        'readOnly': false,
        'mandatory': true,
        'default': 'male'
    },
    'children': {
        'type': ['@Jedi'], // create the link
        'readOnly': false,
        'mandatory': false,
        'default': []
    },
    'firstName': {
        'type': 'string',
        'readOnly': false,
        'mandatory': true,
        'default': ''
    },
    'lastName': {
        'type': 'string',
        'readOnly': false,
        'mandatory': true,
        'default': ''
    },
    'father': {
        'type': '@Jedi',
        'readOnly': false,
        'mandatory': false,
        'default': {}
    }
});

metamodel.create();

// add some code
monoco.system().on('main', function () {
    var Jedi = this.require('Jedi');

    var leia = new Jedi({
        'sex': 'female',
        'firstName': 'Leia Amidala',
        'lastName': 'Skywalker'
    });

    var luke = new Jedi({
        'sex': 'male',
        'firstName': 'Luke',
        'lastName': 'Skywalker'
    });

    // add the references to the object
    var padme = new Jedi({
        'sex': 'female',
        'firstName': 'Padme',
        'lastName': 'Amidala',
        'children': [luke, leia]
    });

    // or add the references by APIs
    // padme.children().push(luke);
    // padme.children().push(leia);

    console.log(padme.children(1).firstName());
});

// run the system
monoco.system().main();