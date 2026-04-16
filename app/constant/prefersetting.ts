type SettingId =
    | "sharp-claw"
    | "rounded-claw"
    | "bezel"
    | "half-bezel"
    | "halo"
    | "hidden-halo"

export type PreferSettingCard = {
    id: SettingId
    title: string
    description: string
    imageUrl: string
    featured?: boolean
}

export const PREFERSETTING: PreferSettingCard[] = [
    {
        id: "sharp-claw",
        title: "Sharp Claw / Prong Set",
        description:
            "An open architectural frame that maximizes light and reveals more of the stone's depth.",
        imageUrl:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBmuE_wi-GWu1fwfiHpJ4pTatSs_GiFR0SdRdiLHV3lzUW2BEaZKpfpwHlM8OxqpJiz2m00T0gRDGqZs5fl5bpMgh0NBLQ_urIfuQiupgAz1QjNnSuP6PWUP98BtbNbeyFfND3AfSqizuQpsZCrAyyph-vqW4PBYvBqiKW-49vSKNz7EsTVfinQl1jVsMHwi5qnzWm9rGppyw4-hjF5iYb7niubpXwmLZOkVbPu2d2NbJHHgopOvHDkZ4wBxfPFaZJMsuP58Vwn6Uc",
    },
    {
        id: "rounded-claw",
        title: "Rounded Claw / Prong Set",
        description: "Classic elegance with smooth, secure prongs for a softer silhouette.",
        imageUrl:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuClfrY9wsWn10W0YnZCz2fH4bzf6QZ5f3NNc8RdoJdkqKq4Edjf1D9HvxiqZ2mRWf0PtVuamTY2MhAinRefMUJwRmZDbMkF_Xmxkpns6S7e1tkLxh4v_TMAY9JunVfoT9mzUkMbTMbahJQ9RRrMV9fDafCepBpYbiQoOg2W_Q8STDP2JPMgdc-djvHemA-pEDNsMIkas8LfDKodfK8EUFPCceHWf3k0mCYEY9w6XY809sAhJO9PXO-8iHcidX9uIG5B9uGzrogz0CQ",
        featured: true,
    },
    {
        id: "bezel",
        title: "Bezel Set",
        description: "The ultimate protective embrace, smooth to the touch and remarkably modern.",
        imageUrl:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAVunZQWtP52ZwpJrwkSlxV2oaqPg-G1OxvwY8J19AvpePwr1C1JNCd3jjy6cV93nYYNxGwZ5Bgujy3Osv4D60KXDE0SUybZ0pIO948xRX27p2Vw8h_NJ2EackuwF9qXCblLhdR639Loq0VjlHPp_x9LSFYEMt2ngLj-BOrNo-tJsAVyK4XgKo_pu5j1nB81LuqbAM-8pgEB27tFPxUxML_h82iuANXObzsOl771OUFEygTFGFQQIFuK_6xklIbka48JjQHnIqtcto",
    },
    {
        id: "half-bezel",
        title: "Half Bezel / Partial Frame",
        description:
            "A contemporary dialogue between structure and light, offering security with a modern edge.",
        imageUrl:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuB1Wq1J0lpOsZQJiOxtmzskzn1dDW9oe2yZIfUs-cKE0XHZmJWISWPoglBDVoaVlFnp4nsOX5VIawG3B_sakUXyWBWYL0DsJ0bWw7j6DlJkUH_gL6Cdk9MJ9eLm8y51_QL_z4SfhSMP8g28IzPiHZIVkxIQK-QaDp7OM6KfrxV076HNFKPF3lHCMLzmPRgS2EDlJLMkHsxzthYY3aTZlfYmO87UcUOTM9ENPT3Wr5ak35WiCDUfQG6agDJj0CZ-zucFLZSg1DmpLR0",
    },
    {
        id: "halo",
        title: "Halo",
        description: "A radiant surround of smaller diamonds to amplify brilliance and presence.",
        imageUrl:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDF2IXxq1IUQUw2y2K4DZgLB7Y3E7eRsEdz-CWqIyRdZWxcdEAZAkUSrGigQc6zrNI_GlPEf1XPn0v5puiOe95Ip1w-VCEfIGB4fhfXB-ZGqVlAqvmi_8mswICZBjI-ObTENR-N0UCJDkgNsUBBBfgMRIzRnOFKPAKdHqYFPiF5QF7tkpiQFjK7GLDsyuXw0OVY3m4F3jpdbCzYkmxuz5paC4esMk5S2VCE0BpMRIzYZGKYW9Kq4_D27gklx4SIfQ_m3z-IjFU0Oyw",
    },
    {
        id: "hidden-halo",
        title: "Hidden Halo",
        description: "A secret detail for the wearer, adding intimate brilliance visible from the side profile.",
        imageUrl:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAl8nHFxV0O4k16rRghWP_uYJjkWJzwk-5kW_FiBa-Zi2zaUwNAR_U6eMk7-vKlYmO-OtykbhkNMfsWBzoksMJn6BqYkuN6i8OWCchEMNdwy6wejGq1pQgT8_ShpD0oE61KdsNYbp09S8qkkU98WE6gZJQNn_dX9_MUGjDSBh8pkKgOXa4VxxD_ZJiKEGdeVwgnSMHuo8B9IHwLYiEYEbGesVHPTssMn3qk1UZ-ePykZs3UzZc2fatHidtwbSqDnS9bOt4SJTqbyz4",
    },
]
