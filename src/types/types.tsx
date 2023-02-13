
export interface TemplateObj {
    name: string,
    description: string,
    template_id: string,
    span: number,
    permissions: string,
    author: string
}

export interface TaskObj {
    position: number,
    position_units: 'days' | 'weeks' | 'months',
    category: string,
    description: string,
    entity_responsible: string,
    type: string,
    template_id: string,
    author: string
} 