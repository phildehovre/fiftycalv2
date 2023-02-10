import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '../App';
import { TemplateType } from '../types/template';


// TEMPLATE Via ID ====================================

const fetchTemplate = async (id: any) => {
    try {
        const res = await supabase
            .from('templates')
            .select()
            .eq('id', id)
            .single()
        return res
    }

    catch (error) {
        console.log(error)
    }

    finally {
    }
};

export function useTemplate(id: string | undefined) {
    return useQuery(
        ['template', { id }], () => fetchTemplate(id)
    )
};


// TEMPLATES ====================================

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

// CAMPAIGNS ====================================

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


// JUNKYARD =====================================

export async function createEvent(event: any) {
    const res = await supabase
        .from('events')
        .insert(event)
        .select()
    return res
}
