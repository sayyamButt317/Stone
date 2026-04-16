export type OwnStonePayload = {
  stone_type: string
  color: string
  shape: string
  approximate_size: string
}

/** Body sent to the backend when creating a ring design from the Client flow */
export type RingCreationPayload = {
  jewelry_type: string
  style_direction: string
  style_family: string
  stone_branch: string
  own_stone: OwnStonePayload
  yss_reference: string
  stone_choice_method: string
  chosen_stone_name: string
  chosen_color: string
  metal: string
  setting: string
  wear_frequency: string
  final_preferences: string
  inspiration_image_url: string
}
