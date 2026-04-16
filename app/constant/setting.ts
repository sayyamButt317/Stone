import { Preference } from "../store/jewellery-store"

type SettingCard = {
    id: Preference
    title: string
    description: string
    imageUrl: string
    imageAlt: string
}
export const SETTINGS: SettingCard[] = [
    {
        id: "sharp_claw",
        title: "Sharp Claw / Prong Set",
        description: "Architectural and precise. Maximizes light entry for ultimate brilliance.",
        imageAlt: "Sharp Claw Jewelry Setting",
        imageUrl:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBFyTn9Z3qUI_xSJ2ETcjetABcudNu4ry6yxrTKY8Q4vOqLVxfYAK7gOdHTGN8B7DAaKLYawgcnQUY4-MoajTGp0wxpIV4ACp9Wb9soTkDf9iWue4mmhSOYPtsEqvzcDBHwanP8q-vm72FKY5KSSpQZ7hzxaUNNfKBy-knkvoHrpaNpedLw_X1IJoOpKg3DFgBLfkcbqDlcduR4PugUu4XIAwsZjRKHDF83pBgAjhAU0C0T03WO56Ej0HjCZoNNh4iT57D4tt7Wne4",
    },
    {
        id: "rounded_claw",
        title: "Rounded Claw / Prong Set",
        description: "Classic and elegant. A timeless choice that balances security with stone visibility.",
        imageAlt: "Rounded Claw Jewelry Setting",
        imageUrl:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuC3aF0F3Kct3_BwMPyytRW39GSoNIMtbJjB5qzObkcFDNJDFYD1zXYChPYkDBOzEE8d9ml_UL5RtNcR4KtTs7bnCv1OQzcky4aH6554rrQ6Vxtag3yt6JDe6QT06lx6v5Q60FUayRwW6evrZ7P_xek4Dr2DnWFEsQehAyDimBjOsMhMeCJGkxKRy-zSGbueIOb5EVtQeMQqO2VZ4v-yLiFIVWwHUPdxLCv6mrYawh5eS-4BJanvfXiDsG6Q7rNRVph4rtxuQDt9hFY",
    },
    {
        id: "bezel",
        title: "Bezel Set",
        description: "Sleek and protective. The stone is held securely within a continuous metal border.",
        imageAlt: "Bezel Jewelry Setting",
        imageUrl:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDKaNYK97V_-6BtfIuXLdJjG1EXYFG-WSV-nkkx169mWwAIS9hCN7nmXZ76JwgxNIIDg6JBNAbac-1YwMQsVt8xWPiTvrJu7UPFq6jZGtKoa_EETS3jGOV78S_FhV8_dTnODwQypXCwW5X2VptpSxLLdIHwhtyfPtXtUo8_njmdoDgThIr6Jai-hhGk-hn6sdR1B6e00E-K2OhK9dYa-i8d3LyFZV8-qk_jOa99-9EOY8DjzT9Lg6P_qbqC6aQd_Ul7LUaB7Wtclr4",
    },
    {
        id: "half_bezel",
        title: "Half Bezel / Partial Frame",
        description: "Modern and structural. Offers protection while revealing more of the stone's profile.",
        imageAlt: "Half Bezel Jewelry Setting",
        imageUrl:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDO0BfWzG_mPS2EsV7oJpmzEIgLh8aG-yxaiLVSzGMbioNakS1DmYDwJo0ltRKdudLAW7uXOXMiOtMcM55zaisjExcLquyJQMEbmC1iXKcVO7KCH6Ds34d1kVlDZXLUxhJB5B8Jn0xvHDEmXgelwG9oIWRuWkaF7VSrHl1oPUC9R6QS4YKnB3mAtOxay_1WkywyXX8p-murx8g7elqn92pNV9pN8kCFzaLJ580ioa1wi1pku6MD5xHbbqE4C9W9S3h-UlcpUqjdX-k",
    },
    {
        id: "halo",
        title: "Halo",
        description: "Radiant and grand. A border of light that makes the center stone appear larger.",
        imageAlt: "Halo Jewelry Setting",
        imageUrl:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCL1C525HFbKDsVd2_3TSTH7Xh7AUHofYDCU_frJ91lA4XpwGML1I3_YZSQ2sNXjELi_is3TTJBWVHioXvwtHPBZ9DY00rWWLQz6iSJczdWEkt_cQwHRlQzv-AkGG97SzjrovSWxiuynj86oNMr4tTFYpdshyPRB4u5-yCWVQzUp8HH3kZW7JtsLUiLAYvWyOvWQhUkAvuQucJPFdWD1vidfq-4qc0DAtMf14gjys6WXplO6rjuDtF4X4b7ypNnQxQya7qQeSU0iUY",
    },
    {
        id: "hidden_halo",
        title: "Hidden Halo",
        description: "Subtle and intimate. A secret detail visible only from the side for extra sparkle.",
        imageAlt: "Hidden Halo Jewelry Setting",
        imageUrl:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuA9jR1NcfZ0ThTQLudvzobgexCub0vVnN1A5lJ7ThiLLipUamn_VKHZM5XT01UlfsP3H_UUS8cDobgiuLS1ZOeU7Tbrx93BmyRi2KM7FQu0DfEuo_jTToIOrIg3lBBkTGEAEgHbNsYZt1G6b_scCLxrq8CCOWsfHpBaD2EWMil_-0C_cM0G4e-sxnoGDXE1bpAWxzeuDEuuby63apxNNTt16gsAN6PKEwCfpNq93HIxyPjs5AY5BiIbzHR3jaHWxFpR-MpyLqSvOCw",
    },
]