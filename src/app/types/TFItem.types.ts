
export type ITFItem = 			{
    name: string,
    defindex: number,
    item_class: string,
    item_type_name: string,
    item_name: string,
    item_description: string,
    proper_name: false,
    item_slot: string,
    model_player: string,
    item_quality: number,
    image_inventory: string,
    min_ilevel: number,
    max_ilevel: number,
    image_url: string,
    image_url_large: string,
    capabilities: {
       nameable:boolean,
       can_gift_wrap:boolean,
       can_craft_mark:boolean,
       can_be_restored:boolean,
       strange_parts:boolean,
       can_card_upgrade:boolean,
       can_strangify:boolean,
       can_killstreakify:boolean,
       can_consume:boolean
    },
    attributes: Attribute[]
},


type Attribute =         {
    name: string,
    class: string,
    value: number
}