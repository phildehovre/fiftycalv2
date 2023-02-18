import { TaskObj, TemplateObj } from "../types/types"

export function convertDaysToUnits(position: number, unit: string) {
    if (unit === 'days') {
        return position
    }
    if (unit === 'weeks') {
        return position / 7
    }
    if (unit === 'months') {
        return Math.round(position / 30.4)
    }
}

export function convertPositionToDays(position: number, unit: string) {
    if (unit === 'days') {
        return position
    }
    if (unit === 'weeks') {
        return position * 7
    }
    if (unit === 'months') {
        return position * 30
    }
}

export function formatTemplateEventsToCampaign(templateEvents: TaskObj[], campaignId: string) {

    console.log(campaignId, '  checking inside helper function')
    const newArray = templateEvents.map((t) => {
        const {
            position,
            author_id,
            description,
            entity_responsible,
            position_units,
            template_id,
            type,
            category
        } = t

        return {
            position,
            author_id,
            description,
            entity_responsible,
            position_units,
            template_id,
            type,
            category,
            completed: false,
            campaign_id: campaignId
        }
    })

    return newArray
}