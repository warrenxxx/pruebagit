import {FunctionModel} from './common/src/models/functionModel';
import {RoleModel} from './common/src/models/role.model';
import {ObjectId} from 'bson';
import {AuditModel} from './common/src/models/audit.model';
import {AccountModel} from './common/src/models/accountModel';

const idmaps = {
    functions: {
        account_manage: 'account',
        functions_manage: 'function',
        role_manage: 'role',
        micro_lesson_manage: 'micro_lesson',
    },
    roles: {
        admin: new ObjectId(),
        user: new ObjectId(),
        read: new ObjectId()
    },
    accounts: {
        w1: new ObjectId(),
        w2: new ObjectId(),
        w3: new ObjectId(),
        w4: new ObjectId(),
        w5: new ObjectId(),
        w6: new ObjectId(),
        w7: new ObjectId(),
    }
};

export const zeedFunctions: FunctionModel [] = [
    {
        '_id': idmaps.functions.account_manage,
        'description': 'account administration',
        'methods': ['c', 'ro', 'ra', 'u', 'd'],
        'other': []
    },
    {
        '_id': idmaps.functions.functions_manage,
        'description': 'functions administration',
        'methods': ['ro', 'ra'],
        'other': []
    },
    {
        '_id': idmaps.functions.role_manage,
        'description': 'role administration',
        'methods': ['c', 'ro', 'ra', 'u', 'd'],
        'other': []
    },
    {
        '_id': idmaps.functions.micro_lesson_manage,
        'description': 'micro lesson administration',
        'methods': ['c', 'ro', 'ra', 'u', 'd'],
        'other': []
    }
];

export const zeedRoles: RoleModel[] = [
    /*
        --Admin roles--
        account  *
        function ra ro
        role *
        micro lesson *
     */
    {
        _id: idmaps.roles.admin,
        audit: new AuditModel(),
        description: 'has all permissions',
        isActive: true,
        name: 'admin',
        functions: [
            {id: idmaps.functions.account_manage, methodsNegates: []},
            {id: idmaps.functions.role_manage, methodsNegates: []},
            {id: idmaps.functions.micro_lesson_manage, methodsNegates: []},
            {id: idmaps.functions.functions_manage, methodsNegates: []},
        ]
    },
    /*
        --USER role--
      account  ra
   */
    {
        _id: idmaps.roles.user,
        audit: new AuditModel(),
        description: 'only read all account',
        isActive: true,
        name: 'user',
        functions: [
            {id: idmaps.functions.account_manage, methodsNegates: ['c', 'ro', 'u', 'd']},
        ]
    },
    /*
            --READ roles--

      micro lesson ra ro
   */
    {
        _id: idmaps.roles.read,
        audit: new AuditModel(),
        description: 'only read all account',
        isActive: true,
        name: 'read',
        functions: [
            {id: idmaps.functions.micro_lesson_manage, methodsNegates: ['c', 'u', 'd']},
        ]
    }
];

export const zeedAccounts: AccountModel[] = [

    {
        _id: idmaps.accounts.w1,
        userName: {id: 'warrenxxx1', serverResource: 'local'},
        password: '1234561',
        user: {birthDate: new Date(), firstName: 'warren1', lastName: 'aroni1', gender: 'masculino1'},
        email: 'warren_x_x1@gmail.com',
        enabled: true,
        roles: [
            'user',
        ],
        functions: [
            {id: idmaps.functions.account_manage, methods: ['ra', 'ro']}
        ],

        audit: new AuditModel()
        /*'
        * ACCOUNT RA
        *         RO
        *
        * */
    },
    {
        _id: idmaps.accounts.w2,
        userName: {id: 'warrenxxx2', serverResource: 'local'},
        password: '1234562',
        user: {birthDate: new Date(), firstName: 'warren2', lastName: 'aroni2', gender: 'masculino2'},
        email: 'warren_x_x2@gmail.com',
        enabled: true,
        roles: [
            'admin'
        ],
        functions: [],
        audit: new AuditModel()
        /*
            account  *
            function ra ro
            role *
            micro lesson *
        * */
    },
    {
        _id: new ObjectId(),
        userName: {id: 'warrenxxx3', serverResource: 'local'},
        password: '1234563',
        user: {birthDate: new Date(), firstName: 'warren3', lastName: 'aroni3', gender: 'masculino3'},
        email: 'warren_x_x3@gmail.com',
        enabled: true,
        roles: [],
        functions: [
            {id: idmaps.functions.account_manage, methods: ['c', 'd']},
            {id: idmaps.functions.role_manage, methods: ['ra', 'ro']},
        ],
        audit: new AuditModel()
        /*
            account  c d
            role ra ro
        * */
    },
    {
        _id: new ObjectId(),
        userName: {id: 'warrenxxx4', serverResource: 'local'},
        password: '1234564',
        user: {birthDate: new Date(), firstName: 'warren4', lastName: 'aroni4', gender: 'masculino4'},
        email: 'warren_x_x4@gmail.com',
        enabled: true,
        roles: [
            'user',
            'read'
        ],
        functions: [
            {id: idmaps.functions.account_manage, methods: ['c']},
            {id: idmaps.functions.role_manage, methods: ['ra', 'ro']},
        ],
        audit: new AuditModel()
        /*'
        *   account c ra
        *   micro lesson ra ro
        *   role ra ro
        *
        * */
    }
];
