import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '../App';


// export const addTemplate = useMutation({
//     mutationFn: async (template: object) => {
//         const res = await supabase
//             .from('templates')
//             .insert([template])
//             .select()
//     }
// });

const fetchTemplate = async (id: string) => {
    try {
        const res = await supabase
            .from('templates')
            .select()
            .eq('template_id', id)
            .single()
        return res
    }

    catch (error) {
        console.log(error)
    }

    finally {
    }
};

export function useTemplate(id: string) {
    return useQuery(
        ['template', { id }], () => fetchTemplate(id),
        {
            enabled: !!id
        }
    )
};


async function fetchTemplates() {
    let res = await supabase
        .from('templates')
        .select('*')
    return res
};

export function useTemplates() {
    return useQuery(
        ['templates'],
        () => fetchTemplates()
    )
};

async function fetchTemplateEvents(templateId: string) {
    let res = await supabase
        .from('template_events')
        .select('*')
        .eq('template_id', templateId)
    return res
};

export function useTemplateEvents(id: string) {
    return useQuery(
        ['template_events', id],
        () => fetchTemplateEvents(id)
    )
};

async function fetchEvents(id: any) {
    let res = await supabase
        .from('events')
        .select('*')
        .eq('template_id', id)
    return res
};

export function useEvents(templateId: any) {
    return useQuery(
        ['events'],
        () => fetchEvents(templateId),
        {
            enabled: !!templateId
        }
    )
};

async function createEvent(event: any) {
    const res = await supabase
        .from('events')
        .insert(event)
        .select()
    return res
}



async function fetchCampaigns() {
    let res = await supabase
        .from('campaigns')
        .select('*')
    return res
};

export function useCampaigns() {
    return useQuery(
        ['campaigns',],
        () => fetchCampaigns(),
    );
};

// ===================== Example ============================


// const addEventMutation = useMutation({
//     mutationFn: async (event: any) => await supabase
//         .from('events')
//         .insert(event)
//         .select(),
//     onSuccess: () => {
//         queryClient.invalidateQueries({ queryKey: ['events'] }),
//             setShow(false)
//         setUserIsCreatingEvent(false)
//         setCellIndex(null)
//     }
// })
