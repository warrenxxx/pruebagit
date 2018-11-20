export interface FunctionModel {
    _id: string;
    description: string;
    methods: ('c' | 'ro' | 'ra' | 'u' | 'd')[];
    other: string[];
}

export interface FunctionModelBasic {
    _id: string;
    methods: ('c' | 'ro' | 'ra' | 'u' | 'd')[];
}




