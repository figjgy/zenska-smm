/**
 * Zenska SMM Command Center - Default Mock Data
 * Purpose-built for Zenska.ph (Philippines Trust-First Beauty & Wellness Marketplace)
 * Leadership Recipient: Gaurav Shukla (Head of Technology & Marketing)
 */

window.ZENSKA_INITIAL_DATA = {
  metadata: {
    appName: "Zenska SMM Command Center",
    version: "2.4.0",
    brandTheme: {
      primary: "#5C0A3F",
      lightAccent: "#F4E9EF",
      darkPlum: "#3E042A",
      verifiedGreen: "#059669"
    },
    stakeholder: {
      name: "Gaurav Shukla",
      title: "Head of Technology & Marketing",
      email: "gaurav.shukla@zenska.ph"
    },
    businessFacts: {
      sellersCount: 320,
      authenticatedProducts: 12000,
      commissionRate: "8% flat",
      vendorApprovalDays: "2-5 days",
      shopperRating: "4.9★",
      marketContext: "Beauty is 2nd most counterfeited category in PH (91% online complaints H1 2023). Zenska guarantees 100% genuine products."
    },
    contentPillars: [
      "Authenticity & Trust",
      "Ingredient Education",
      "Ask Zena Demos",
      "Product Spotlights",
      "Social Proof / UGC",
      "Promos & Watch & Buy"
    ],
    taskCategories: [
      "Content Creation",
      "Community Management",
      "Influencer Outreach",
      "Ads",
      "Analytics/Reporting",
      "Livestream",
      "Admin"
    ]
  },

  tasks: [
    {
      id: "task-101",
      title: "Publish 'Molecule of the Month: Niacinamide' carousel & Reel",
      description: "Explain 2% vs 5% concentrations, pair with Soul Apothecary serum and Cocobody soothing cream. Highlight FDA verification seals.",
      category: "Content Creation",
      status: "in_progress",
      priority: "High",
      due_date: "2026-09-22",
      linked_platform: "instagram",
      recurrence_rule: "Monthly (Every 3rd Tuesday)",
      checklist: [
        { id: "c1", text: "Dermatologist review of graphic claims", completed: true },
        { id: "c2", text: "Tag verified partner @soulapothecary.ph", completed: true },
        { id: "c3", text: "Draft Ask Zena scan deep-link sticker", completed: false }
      ]
    },
    {
      id: "task-102",
      title: "Weekly executive performance digest for Gaurav Shukla",
      description: "Synthesize 7-day cross-platform metrics, engagement delta on TikTok Ask Zena scans, and flagged counterfeit customer inquiry turnaround.",
      category: "Analytics/Reporting",
      status: "todo",
      priority: "High",
      due_date: "2026-09-23",
      linked_platform: "linkedin",
      recurrence_rule: "Weekly (Every Monday Morning)",
      checklist: [
        { id: "c4", text: "Pull aggregated reach and top 3 UGC videos", completed: false },
        { id: "c5", text: "Review Shopee grey-market sentiment log", completed: false },
        { id: "c6", text: "Generate exportable PDF summary", completed: false }
      ]
    },
    {
      id: "task-103",
      title: "Review flagged authenticity DM: batch code verification for Rhode Peptide Tint",
      description: "Shopper worried about fake Rhode circulating on TikTok. Send official brand distributor certificate and 100% refund guarantee slip.",
      category: "Community Management",
      status: "needs_review",
      priority: "High",
      due_date: "2026-09-21",
      linked_platform: "instagram",
      recurrence_rule: "None",
      checklist: [
        { id: "c7", text: "Cross-reference batch code #RH-2026B with vendor approval manifest", completed: true },
        { id: "c8", text: "Send canned response with official Certificate of Origin", completed: true },
        { id: "c9", text: "Log resolution in Trust & Safety register", completed: false }
      ]
    },
    {
      id: "task-104",
      title: "Seed Rhode Peptide Lip Tint to Dr. Camille & Skinfluencer Sofia",
      description: "Provide PR mailers with custom Ask Zena QR card for shade matching. Coordinate unboxing embargo date ahead of 10.10 launch.",
      category: "Influencer Outreach",
      status: "in_progress",
      priority: "Medium",
      due_date: "2026-09-24",
      linked_platform: "tiktok",
      recurrence_rule: "Bi-weekly campaign",
      checklist: [
        { id: "c10", text: "Pack sealed PR mailer with temperature-controlled pouch", completed: true },
        { id: "c11", text: "Send Lalamove tracking to Sofia and Dr. Camille", completed: true },
        { id: "c12", text: "Follow up on initial texture feedback", completed: false }
      ]
    },
    {
      id: "task-105",
      title: "Prep TikTok Live 'Watch & Buy' run-of-show with TONYMOLY Ceramide",
      description: "Host 45-minute livestream: live barcode scan demo, flash voucher drop, and genuine vs fake packaging comparison live on air.",
      category: "Livestream",
      status: "todo",
      priority: "Medium",
      due_date: "2026-09-25",
      linked_platform: "tiktok",
      recurrence_rule: "Weekly (Thursdays 7PM PHT)",
      checklist: [
        { id: "c13", text: "Set up OBS live overlay with flash voucher codes", completed: false },
        { id: "c14", text: "Brief co-host on authentic holographic seal cues", completed: false },
        { id: "c15", text: "Coordinate with warehouse for real-time inventory counter", completed: false }
      ]
    },
    {
      id: "task-106",
      title: "Meta & TikTok Retargeting Ad copy refresh (Payday Authentic Guarantee)",
      description: "Update creative assets: focus on 91% counterfeit stat hook and 2-5 day vendor vetting guarantee. Hook: 'Never wonder if it's fake again.'",
      category: "Ads",
      status: "done",
      priority: "Medium",
      due_date: "2026-09-20",
      linked_platform: "facebook",
      recurrence_rule: "Bi-weekly",
      checklist: [
        { id: "c16", text: "A/B test headline: '100% Authentic Beauty' vs 'No Grey-Market Fakes'", completed: true },
        { id: "c17", text: "Verify UTM tracking tags on ask-zena landing page", completed: true }
      ]
    },
    {
      id: "task-107",
      title: "Audit Connected Account tokens (Pinterest & X expiring in 3 days)",
      description: "Renew OAuth refresh tokens to prevent automated scheduler failures before weekend campaign drop.",
      category: "Admin",
      status: "needs_review",
      priority: "High",
      due_date: "2026-09-21",
      linked_platform: "pinterest",
      recurrence_rule: "Monthly token cycle",
      checklist: [
        { id: "c18", text: "Reconnect Pinterest Business API", completed: false },
        { id: "c19", text: "Verify X Developer Portal v2 token heartbeat", completed: true }
      ]
    },
    {
      id: "task-108",
      title: "Curate UGC clips from #ZenskaAuthentic haul community",
      description: "Select 4 verified customer unboxings showing the purple holographic authenticity tamper-evident tape for Monday reel.",
      category: "Content Creation",
      status: "done",
      priority: "Low",
      due_date: "2026-09-19",
      linked_platform: "instagram",
      recurrence_rule: "Weekly",
      checklist: [
        { id: "c20", text: "Obtain usage permissions via IG DM", completed: true },
        { id: "c21", text: "Export high-res clips into Zenska Media Library", completed: true }
      ]
    }
  ],

  posts: [
    {
      id: "post-201",
      caption: "Ever wondered why some Korean toners smell different online? 🧴 91% of online counterfeit complaints in the Philippines trace back to unverified resellers. At Zenska, every bottle of TONYMOLY Ceramide Mochi Toner comes with verified brand authorization and tamper-evident packaging. Tap to inspect the seal! #ZenskaAuthentic #NoFakesAllowed #TONYMOLYph #SkincarePH",
      platforms: ["instagram", "facebook"],
      content_pillar: "Authenticity & Trust",
      scheduled_at: "2026-09-21T18:00:00+08:00",
      status: "scheduled",
      campaign_id: "camp-01",
      media: [
        {
          id: "m-01",
          url: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80",
          type: "photo",
          name: "tonymoly-ceramide-seal.jpg"
        },
        {
          id: "m-02",
          url: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=80",
          type: "photo",
          name: "tamper-proof-seal-macro.jpg"
        }
      ],
      published_urls: {}
    },
    {
      id: "post-202",
      caption: "Molecule of the Month: Niacinamide ✨ Why 2% to 5% is the sweet spot for humid Manila weather. Higher isn't always better — dermatologists warn that >10% can cause flushing and irritation. Slide to find your exact match on Ask Zena! #MoleculeOfTheMonth #IngredientEducation #NiacinamidePh #DermApproved #ZenskaWellness",
      platforms: ["instagram", "pinterest", "linkedin"],
      content_pillar: "Ingredient Education",
      scheduled_at: "2026-09-22T11:30:00+08:00",
      status: "scheduled",
      campaign_id: "camp-02",
      media: [
        {
          id: "m-03",
          url: "https://images.unsplash.com/photo-1608248597359-05244510b65a?auto=format&fit=crop&w=900&q=80",
          type: "photo",
          name: "niacinamide-education-slide1.jpg"
        }
      ],
      published_urls: {}
    },
    {
      id: "post-203",
      caption: "POV: You scan your face for 60 seconds and find the exact barrier-repair routine for combination Filipina skin 🌸 Try 'Ask Zena' right now in our bio — zero guesswork, 100% verified authentic stock only. #AskZena #SkinScanAI #SkincareRoutine #BeautyTechPH #Zenska",
      platforms: ["tiktok", "instagram"],
      content_pillar: "Ask Zena Demos",
      scheduled_at: "2026-09-23T19:00:00+08:00",
      status: "draft",
      campaign_id: "camp-03",
      media: [
        {
          id: "m-04",
          url: "https://images.unsplash.com/photo-1512290900672-1f5be6343bdf?auto=format&fit=crop&w=900&q=80",
          type: "video",
          name: "ask-zena-screen-scan-demo.mp4"
        }
      ],
      published_urls: {}
    },
    {
      id: "post-204",
      caption: "The wait is over! Rhode Peptide Lip Tints have officially landed in the Philippines exclusively via Zenska's verified partners. Batch coded, climate-controlled shipping, 100% genuine guaranteed. Which shade are you grabbing: Toast, Ribbon, or Espresso? ☕✨ #RhodePH #HaileyBieberSkin #RhodeLipTint #ZenskaBeauty",
      platforms: ["instagram", "tiktok", "facebook", "x"],
      content_pillar: "Product Spotlights",
      scheduled_at: "2026-09-24T12:00:00+08:00",
      status: "scheduled",
      campaign_id: "camp-03",
      media: [
        {
          id: "m-05",
          url: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=80",
          type: "photo",
          name: "rhode-peptide-tints-swatches.jpg"
        }
      ],
      published_urls: {}
    },
    {
      id: "post-205",
      caption: "'I used to get breakout scares from cheap online sellers... Zenska's verified seller badge gives me total peace of mind.' — Bea M., Makati City ⭐⭐⭐⭐⭐ Over 12,000 authenticated skincare and beauty essentials delivered safely across Metro Manila and Cebu. #ZenskaShopper #ProofOverPromises #RealReviews #AuthenticBeautyPH",
      platforms: ["facebook", "instagram"],
      content_pillar: "Social Proof / UGC",
      scheduled_at: "2026-09-25T17:30:00+08:00",
      status: "draft",
      campaign_id: null,
      media: [
        {
          id: "m-06",
          url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80",
          type: "photo",
          name: "ugc-shopper-unboxing-review.jpg"
        }
      ],
      published_urls: {}
    },
    {
      id: "post-206",
      caption: "🔴 WATCH & BUY LIVE TOMORROW: 7:00 PM PHT! Join licensed aesthetician Danica for an interactive routine session featuring Soul Apothecary and Cocobody. Exclusive live-only vouchers + win 1 of 5 full skincare kits! Tap 'Remind Me' below. #WatchAndBuy #LivestreamShopping #SoulApothecary #ZenskaLive",
      platforms: ["tiktok", "youtube", "facebook"],
      content_pillar: "Promos & Watch & Buy",
      scheduled_at: "2026-09-26T10:00:00+08:00",
      status: "scheduled",
      campaign_id: "camp-04",
      media: [
        {
          id: "m-07",
          url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80",
          type: "video",
          name: "watch-and-buy-promo-teaser.mp4"
        }
      ],
      published_urls: {}
    },
    {
      id: "post-207",
      caption: "How our 2-5 Day Vendor Vetting works: Every single seller must submit valid DTI/SEC registration, official brand distributor letters, and batch lab test results before listing a single product on Zenska.ph. Here is why we will never compromise on safety. #BehindTheScenes #ZenskaStandards #ECommerceTrust #PhilippinesBusiness",
      platforms: ["linkedin", "x"],
      content_pillar: "Authenticity & Trust",
      scheduled_at: "2026-09-18T09:00:00+08:00",
      status: "published",
      campaign_id: null,
      media: [
        {
          id: "m-08",
          url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
          type: "photo",
          name: "vendor-vetting-flowchart.jpg"
        }
      ],
      published_urls: {
        linkedin: "https://linkedin.com/posts/zenska-ph-vendor-standards-29402"
      }
    }
  ],

  mediaAssets: [
    {
      id: "m-01",
      title: "TONYMOLY Mochi Toner Seal Macro",
      file_url: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80",
      type: "photo",
      tags: ["TONYMOLY", "Authenticity", "Packaging", "Seals"],
      uploaded_at: "2026-09-19",
      dimensions: "1080x1350",
      size_kb: 480,
      used_in_posts: ["post-201"]
    },
    {
      id: "m-02",
      title: "Tamper-Proof Hologram Seal Inspection",
      file_url: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=80",
      type: "photo",
      tags: ["Trust", "Macro", "Security", "Packaging"],
      uploaded_at: "2026-09-18",
      dimensions: "1080x1080",
      size_kb: 610,
      used_in_posts: ["post-201"]
    },
    {
      id: "m-03",
      title: "Molecule of the Month: Niacinamide Serum",
      file_url: "https://images.unsplash.com/photo-1608248597359-05244510b65a?auto=format&fit=crop&w=900&q=80",
      type: "photo",
      tags: ["Ingredient Education", "Soul Apothecary", "Serum", "Science"],
      uploaded_at: "2026-09-20",
      dimensions: "1080x1350",
      size_kb: 520,
      used_in_posts: ["post-202"]
    },
    {
      id: "m-04",
      title: "Ask Zena AI Skin Scan in Action",
      file_url: "https://images.unsplash.com/photo-1512290900672-1f5be6343bdf?auto=format&fit=crop&w=900&q=80",
      type: "video",
      tags: ["Ask Zena", "App Demo", "AI Scan", "Reels"],
      uploaded_at: "2026-09-17",
      dimensions: "1080x1920",
      size_kb: 3400,
      used_in_posts: ["post-203"]
    },
    {
      id: "m-05",
      title: "Rhode Peptide Lip Tints Batch Lineup",
      file_url: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=80",
      type: "photo",
      tags: ["Rhode", "Launch", "Lip Care", "Swatches"],
      uploaded_at: "2026-09-20",
      dimensions: "1080x1080",
      size_kb: 730,
      used_in_posts: ["post-204"]
    },
    {
      id: "m-06",
      title: "Customer Unboxing & Review UGC",
      file_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80",
      type: "photo",
      tags: ["UGC", "Community", "Reviews", "Unboxing"],
      uploaded_at: "2026-09-19",
      dimensions: "1080x1350",
      size_kb: 490,
      used_in_posts: ["post-205"]
    },
    {
      id: "m-07",
      title: "Watch & Buy Live Studio Set Preview",
      file_url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80",
      type: "video",
      tags: ["Watch & Buy", "Livestream", "Promo", "Studio"],
      uploaded_at: "2026-09-16",
      dimensions: "1080x1920",
      size_kb: 4200,
      used_in_posts: ["post-206"]
    },
    {
      id: "m-08",
      title: "Zenska 5-Step Vendor Verification Chart",
      file_url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
      type: "photo",
      tags: ["B2B", "Compliance", "Trust", "Infographic"],
      uploaded_at: "2026-09-15",
      dimensions: "1200x628",
      size_kb: 380,
      used_in_posts: ["post-207"]
    },
    {
      id: "m-09",
      title: "Anastasia Beverly Hills Brow Genius Authenticated Box",
      file_url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
      type: "photo",
      tags: ["Anastasia", "Makeup", "Authenticity", "Packaging"],
      uploaded_at: "2026-09-14",
      dimensions: "1080x1080",
      size_kb: 560,
      used_in_posts: []
    },
    {
      id: "m-10",
      title: "Cocobody Cold Pressed Virgin Coconut Elixir",
      file_url: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=900&q=80",
      type: "photo",
      tags: ["Cocobody", "Local Brands", "Organic", "Wellness"],
      uploaded_at: "2026-09-13",
      dimensions: "1080x1350",
      size_kb: 640,
      used_in_posts: []
    }
  ],

  connectedAccounts: [
    {
      id: "acc-ig",
      platform: "instagram",
      platform_label: "Instagram",
      profile_name: "@zenska.ph",
      avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      follower_count: "84,520",
      token_status: "healthy",
      token_health_color: "green",
      connected_at: "2026-01-10",
      token_expires_days: 58,
      status_badge: "Active",
      icon: "instagram"
    },
    {
      id: "acc-tiktok",
      platform: "tiktok",
      platform_label: "TikTok",
      profile_name: "@zenska_ph",
      avatar_url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
      follower_count: "142,300",
      token_status: "healthy",
      token_health_color: "green",
      connected_at: "2026-02-14",
      token_expires_days: 42,
      status_badge: "Active",
      icon: "video"
    },
    {
      id: "acc-fb",
      platform: "facebook",
      platform_label: "Facebook Page",
      profile_name: "Zenska Philippines Authentic Beauty",
      avatar_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
      follower_count: "61,840",
      token_status: "healthy",
      token_health_color: "green",
      connected_at: "2025-11-20",
      token_expires_days: 74,
      status_badge: "Active",
      icon: "facebook"
    },
    {
      id: "acc-yt",
      platform: "youtube",
      platform_label: "YouTube",
      profile_name: "Zenska Beauty Lab PH",
      avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      follower_count: "19,400",
      token_status: "healthy",
      token_health_color: "green",
      connected_at: "2026-03-01",
      token_expires_days: 81,
      status_badge: "Active",
      icon: "youtube"
    },
    {
      id: "acc-x",
      platform: "x",
      platform_label: "X (Twitter)",
      profile_name: "@ZenskaPH",
      avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      follower_count: "12,900",
      token_status: "expiring_soon",
      token_health_color: "yellow",
      connected_at: "2026-07-22",
      token_expires_days: 3,
      status_badge: "Renew Soon",
      icon: "twitter"
    },
    {
      id: "acc-li",
      platform: "linkedin",
      platform_label: "LinkedIn",
      profile_name: "Zenska.ph Marketplace",
      avatar_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
      follower_count: "8,340",
      token_status: "healthy",
      token_health_color: "green",
      connected_at: "2026-04-12",
      token_expires_days: 65,
      status_badge: "Active",
      icon: "linkedin"
    },
    {
      id: "acc-pin",
      platform: "pinterest",
      platform_label: "Pinterest",
      profile_name: "Zenska Beauty Aesthetics",
      avatar_url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=150&q=80",
      follower_count: "24,800",
      token_status: "expiring_soon",
      token_health_color: "yellow",
      connected_at: "2026-06-25",
      token_expires_days: 2,
      status_badge: "Expiring Soon",
      icon: "share-2"
    }
  ],

  analytics: {
    summary: {
      totalFollowers: "354,100",
      followerGrowthDelta: "+8.4%",
      followerGrowthAbsolute: "+27,450",
      periodReach: "1.42M",
      reachGrowthDelta: "+16.2%",
      engagementRate: "4.82%",
      engagementDelta: "+0.65%",
      savesAndShares: "64,280",
      topPostEngagement: "11.4%",
      topPostTitle: "TONYMOLY Mochi Toner Seal Breakdown"
    },
    timeRanges: {
      "7d": {
        totalReach: "348,500",
        totalImpressions: "512,000",
        avgEngagementRate: "5.1%",
        newFollowers: "+4,920",
        saves: "14,890",
        shares: "5,310",
        dailyData: [
          { day: "Mon", reach: 42000, engagement: 4.8, followers: 640 },
          { day: "Tue", reach: 49000, engagement: 5.3, followers: 780 },
          { day: "Wed", reach: 58000, engagement: 5.9, followers: 940 },
          { day: "Thu", reach: 46000, engagement: 4.7, followers: 610 },
          { day: "Fri", reach: 53000, engagement: 5.4, followers: 820 },
          { day: "Sat", reach: 62000, engagement: 5.8, followers: 910 },
          { day: "Sun", reach: 38500, engagement: 4.2, followers: 420 }
        ]
      },
      "30d": {
        totalReach: "1,420,000",
        totalImpressions: "2,180,000",
        avgEngagementRate: "4.82%",
        newFollowers: "+27,450",
        saves: "64,280",
        shares: "22,400",
        dailyData: [
          { day: "Wk 1", reach: 310000, engagement: 4.6, followers: 5800 },
          { day: "Wk 2", reach: 355000, engagement: 4.9, followers: 6900 },
          { day: "Wk 3", reach: 395000, engagement: 5.2, followers: 7950 },
          { day: "Wk 4", reach: 360000, engagement: 4.7, followers: 6800 }
        ]
      }
    },
    platformBreakdown: [
      { platform: "TikTok", followers: "142.3K", reach: "680K", engRate: "6.2%", growth: "+12.4%", color: "#000000" },
      { platform: "Instagram", followers: "84.5K", reach: "410K", engRate: "5.1%", growth: "+7.8%", color: "#E1306C" },
      { platform: "Facebook", followers: "61.8K", reach: "195K", engRate: "3.4%", growth: "+3.9%", color: "#1877F2" },
      { platform: "Pinterest", followers: "24.8K", reach: "82K", engRate: "4.0%", growth: "+5.1%", color: "#E60023" },
      { platform: "YouTube", followers: "19.4K", reach: "38K", engRate: "4.8%", growth: "+6.0%", color: "#FF0000" },
      { platform: "X", followers: "12.9K", reach: "15K", engRate: "2.8%", growth: "+2.1%", color: "#1DA1F2" }
    ],
    pillarPerformance: [
      {
        pillar: "Authenticity & Trust",
        engagementScore: 94,
        avgEngagementRate: "6.4%",
        totalShares: 18200,
        saves: 24100,
        notes: "Highest save rate. Educational counterfeit teardowns drive massive viral sharing."
      },
      {
        pillar: "Ingredient Education",
        engagementScore: 88,
        avgEngagementRate: "5.8%",
        totalShares: 14500,
        saves: 31200,
        notes: "Highest bookmark/save rate. Molecule of the Month series performs consistently well."
      },
      {
        pillar: "Ask Zena Demos",
        engagementScore: 82,
        avgEngagementRate: "5.2%",
        totalShares: 11800,
        saves: 16400,
        notes: "Highest app scan click-through rate (>8.5% link click conversion on TikTok)."
      },
      {
        pillar: "Product Spotlights",
        engagementScore: 76,
        avgEngagementRate: "4.5%",
        totalShares: 7900,
        saves: 9800,
        notes: "Rhode and TONYMOLY announcements spike purchase intent significantly."
      },
      {
        pillar: "Social Proof / UGC",
        engagementScore: 79,
        avgEngagementRate: "4.9%",
        totalShares: 8400,
        saves: 11200,
        notes: "Tamper-tape unboxings reduce checkout hesitation by 34%."
      },
      {
        pillar: "Promos & Watch & Buy",
        engagementScore: 71,
        avgEngagementRate: "4.1%",
        totalShares: 6200,
        saves: 5300,
        notes: "Livestream spikes immediate sales GMV during the broadcast hour."
      }
    ]
  },

  inboxItems: [
    {
      id: "inbox-301",
      platform: "instagram",
      type: "dm",
      author_name: "Mariel Santos",
      author_handle: "@marielsantos_ph",
      author_avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
      content: "Hi Zenska team! I saw an unverified seller on Shopee selling the Rhode Lip Tint for only ₱650, while yours is ₱1,450. How can I be 100% sure your stocks are original US batches?",
      status: "needs_response",
      is_flagged: true,
      flag_reason: "Counterfeit/Authenticity inquiry",
      received_at: "10 mins ago",
      linked_post_id: "post-204",
      recommended_canned: "canned-auth-01"
    },
    {
      id: "inbox-302",
      platform: "tiktok",
      type: "comment",
      author_name: "Kylie Cruz",
      author_handle: "@kylie_cruz_skincare",
      author_avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
      content: "Can you feature Soul Apothecary's Azelaic Acid next for Molecule of the Month? My acne scars cleared up using it from your app!",
      status: "needs_response",
      is_flagged: false,
      flag_reason: null,
      received_at: "35 mins ago",
      linked_post_id: "post-202",
      recommended_canned: "canned-product-01"
    },
    {
      id: "inbox-303",
      platform: "facebook",
      type: "comment",
      author_name: "Atty. Renato Gomez",
      author_handle: "Renato Gomez",
      author_avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
      content: "Bought TONYMOLY from a mall kiosk before and it had no English labels. Received my Zenska package today with FDA CPR and full verification QR. Salute to genuine businesses.",
      status: "resolved",
      is_flagged: false,
      flag_reason: null,
      received_at: "2 hours ago",
      linked_post_id: "post-201",
      recommended_canned: "canned-thanks-01"
    },
    {
      id: "inbox-304",
      platform: "instagram",
      type: "dm",
      author_name: "Bianca Dee",
      author_handle: "@biancadee_glow",
      author_avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80",
      content: "URGENT: Someone is using your official Zenska logo on a suspicious Telegram reseller group offering 70% off Anastasia palettes. Here is the screenshot link!",
      status: "escalated",
      is_flagged: true,
      flag_reason: "Brand Impersonation / Fraud Alert",
      received_at: "3 hours ago",
      linked_post_id: null,
      recommended_canned: "canned-legal-01"
    },
    {
      id: "inbox-305",
      platform: "tiktok",
      type: "comment",
      author_name: "Joanna Reyes",
      author_handle: "@jo_reyes_beauty",
      author_avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=80",
      content: "Does Ask Zena work if I have hormonal breakout flareups around my jawline?",
      status: "resolved",
      is_flagged: false,
      flag_reason: null,
      received_at: "5 hours ago",
      linked_post_id: "post-203",
      recommended_canned: "canned-zena-01"
    }
  ],

  cannedResponses: [
    {
      id: "canned-auth-01",
      title: "Authenticity & Pricing Guarantee",
      category: "Authenticity",
      text: "Hi {{name}}! Thank you for checking. In the PH market, 91% of counterfeit complaints come from unverified online listings selling cheap replicas. Zenska does not allow unauthorized grey-market sellers. Every single Rhode product on Zenska is sourced directly through brand-authorized logistics, batch-inspected, and backed by our 100% Authenticity Money-Back Guarantee. You can scan the purple security QR code on your box to inspect the lab manifest! 💜"
    },
    {
      id: "canned-zena-01",
      title: "Ask Zena AI Routine Guide",
      category: "Feature Demo",
      text: "Hello {{name}}! Yes, absolutely. Ask Zena is programmed with clinical dermatological logic for tropical climates. When you do the 60-second skin scan, make sure to take the selfie in natural light. It will identify localized inflammation and recommend gentle barrier-restoring ingredients like Centella, Ceramide, and low-dose Niacinamide."
    },
    {
      id: "canned-product-01",
      title: "Product Request Acknowledgement",
      category: "Community",
      text: "We love this idea! Adding Soul Apothecary Azelaic Acid to our editorial calendar for next month's Molecule series. Thank you so much for being part of the verified Zenska community! ✨"
    },
    {
      id: "canned-legal-01",
      title: "Impersonation / Legal Escalation",
      category: "Trust & Safety",
      text: "Thank you so much for bringing this to our attention, {{name}}. We take brand impersonation and fake listings very seriously. Our Trust & Safety team led by Gaurav Shukla has initiated takedown proceedings with the relevant authorities. Please remember Zenska only operates via Zenska.ph and our official iOS/Android apps."
    }
  ],

  influencers: [
    {
      id: "inf-401",
      name: "Dr. Camille Valero, MD, DPDS",
      handle: "@drcamille_derm",
      platform: "Instagram & TikTok",
      follower_count: "185,000",
      niche: "Dermatologist",
      contact_info: {
        email: "collabs@drcamillevalero.com",
        phone: "+63 917 555 0192"
      },
      pipeline_status: "Content Received",
      notes: "Board-certified dermatologist. Reviewed Niacinamide educational carousel copy. Provided medical sign-off.",
      seeded_products: ["Soul Apothecary 5% Niacinamide", "TONYMOLY Mochi Toner"],
      received_content: ["IG Reel: '3 Niacinamide Mistakes in PH Humid Weather'"]
    },
    {
      id: "inf-402",
      name: "Sofia Alcantara",
      handle: "@sofia.skinglow",
      platform: "TikTok",
      follower_count: "240,000",
      niche: "Skinfluencer",
      contact_info: {
        email: "sofia@glowtalents.ph",
        phone: "+63 918 888 2301"
      },
      pipeline_status: "Product Seeded",
      notes: "Seeded Rhode Peptide Lip Tints in Toast & Espresso with Ask Zena scan card. Video scheduled for launch week.",
      seeded_products: ["Rhode Peptide Tint (Toast & Espresso)"],
      received_content: []
    },
    {
      id: "inf-403",
      name: "Bea Alonzo-Morales",
      handle: "@beabeauty_manila",
      platform: "Instagram",
      follower_count: "92,000",
      niche: "General Beauty",
      contact_info: {
        email: "bea.alonzo.mgmt@gmail.com",
        phone: "+63 920 444 1188"
      },
      pipeline_status: "Negotiating",
      notes: "Discussing contract for 10.10 Watch & Buy Livestream co-host. Asking rate: ₱25k per 1-hour session.",
      seeded_products: ["APERIRE Day Dream Cover Cushion"],
      received_content: []
    },
    {
      id: "inf-404",
      name: "Dr. Joshua Tan, MD",
      handle: "@drjosh.skinscience",
      platform: "TikTok & YouTube",
      follower_count: "310,000",
      niche: "Dermatologist",
      contact_info: {
        email: "inquiries@drjoshskin.ph",
        phone: "+63 917 999 4412"
      },
      pipeline_status: "Posted",
      notes: "Live demo of Ask Zena AI scanner comparing routine matches against clinical guidelines. High conversion.",
      seeded_products: ["Cocobody Restorative Oil", "Anastasia Brow Genius"],
      received_content: ["TikTok #ZenskaPartner: 'Is AI Skin Scanning Legit?' (142k views)"]
    },
    {
      id: "inf-405",
      name: "Kyla Mendoza",
      handle: "@kyla_skinquester",
      platform: "Instagram",
      follower_count: "48,000",
      niche: "Skinfluencer",
      contact_info: {
        email: "kyla.mendoza@creators.ph",
        phone: "+63 922 333 7766"
      },
      pipeline_status: "Outreached",
      notes: "Sent invitation for October Molecule of the Month (Retinol) seeding package.",
      seeded_products: [],
      received_content: []
    }
  ],

  hashtagSets: [
    {
      id: "hash-01",
      platform: "Instagram",
      content_pillar: "Authenticity & Trust",
      name: "IG — Authenticity First",
      tags: ["#ZenskaAuthentic", "#NoFakesAllowed", "#ProofOverPromises", "#VerifiedBeautyPH", "#LegitSkincarePH", "#AuthenticBeautyOnly"]
    },
    {
      id: "hash-02",
      platform: "TikTok",
      content_pillar: "Ask Zena Demos",
      name: "TikTok — Ask Zena Viral",
      tags: ["#AskZena", "#SkinScanAI", "#BeautyTechPH", "#SkinTokPH", "#SkinBarrierRepair", "#ZenskaApp"]
    },
    {
      id: "hash-03",
      platform: "Instagram",
      content_pillar: "Ingredient Education",
      name: "IG — Molecule Education",
      tags: ["#MoleculeOfTheMonth", "#IngredientLiterate", "#NiacinamideFacts", "#DermReviewedPH", "#SkincareSciencePH", "#ZenskaWellness"]
    },
    {
      id: "hash-04",
      platform: "TikTok",
      content_pillar: "Promos & Watch & Buy",
      name: "TikTok — Livestream Shopping",
      tags: ["#WatchAndBuy", "#ZenskaLive", "#BudolWithCertainty", "#BeautySalePH", "#LiveShoppingPH"]
    }
  ],

  captionTemplates: [
    {
      id: "cap-01",
      title: "Counterfeit Teardown / Education",
      content_pillar: "Authenticity & Trust",
      funnel_stage: "Awareness",
      text: "🚨 3 red flags you might be looking at a fake {{product_name}} online: \n\n1. The price is >40% lower than brand MSRP.\n2. No official distributor seal or FDA CPR notification.\n3. The packaging font spacing is slightly off.\n\nIn the Philippines, 91% of fake cosmetic reports happen on unverified e-commerce platforms. At Zenska.ph, every batch is verified with direct brand authorization before it reaches your doorstep. Tap our bio to get 100% genuine certainty. 🛡️✨",
      performance_notes: "Avg 8.2% save rate; exceptional comment-to-share ratio."
    },
    {
      id: "cap-02",
      title: "Molecule of the Month Breakdown",
      content_pillar: "Ingredient Education",
      funnel_stage: "Consideration",
      text: "Molecule of the Month: {{ingredient_name}} 🧪\n\nWhat it does: {{key_benefit}}\nBest concentration for PH humidity: {{recommended_percentage}}\nPairs best with: {{synergy_ingredients}}\nAvoid mixing with: {{avoid_ingredients}}\n\nNot sure if this fits your current barrier routine? Scan your skin in 60 seconds on the Ask Zena scanner on Zenska.ph! 💡",
      performance_notes: "Strongest bookmark rate across IG Carousels and Pinterest pins."
    },
    {
      id: "cap-03",
      title: "Ask Zena 60-Second Scan Hook",
      content_pillar: "Ask Zena Demos",
      funnel_stage: "Consideration",
      text: "Stop guessing which skincare product works for your skin type. 📱✨\n\nTake the 60-second 'Ask Zena' selfie scan — our AI analyzes barrier hydration, oil balance, and pore clarity to build your personalized 3-step routine. Every recommended product is verified authentic and delivered right to your doorstep. Tap the link in bio to try it free!",
      performance_notes: "High conversion to mobile app installs and routine builder completions."
    },
    {
      id: "cap-04",
      title: "Watch & Buy Flash Voucher Announcement",
      content_pillar: "Promos & Watch & Buy",
      funnel_stage: "Conversion",
      text: "🔴 LIVE SHOPPING ALERT: We are going live on {{date_time}} with {{featured_brand}}! \n\nGet ready for exclusive live-only vouchers, authentic batch code reveals, and instant checkout while watching. Drop a '🔥' in the comments to receive an instant direct link reminder!",
      performance_notes: "Drives 300+ calendar reminders per post."
    }
  ],

  campaigns: [
    {
      id: "camp-01",
      name: "10.10 Double Date Authentic Festival",
      type: "sale",
      start_date: "2026-10-01",
      end_date: "2026-10-12",
      brand_partner: "TONYMOLY, Soul Apothecary, APERIRE",
      status: "Confirmed",
      budget: "₱120,000",
      goals: "Drive ₱2.4M GMV with 0 counterfeit tolerance marketing"
    },
    {
      id: "camp-02",
      name: "Molecule of the Month: Niacinamide & Retinol",
      type: "seasonal",
      start_date: "2026-09-01",
      end_date: "2026-09-30",
      brand_partner: "Soul Apothecary",
      status: "Live",
      budget: "₱45,000",
      goals: "100k views on TikTok educational clips; 2,500 saves"
    },
    {
      id: "camp-03",
      name: "Rhode PH Official Partner Launch",
      type: "launch",
      start_date: "2026-09-15",
      end_date: "2026-10-05",
      brand_partner: "Rhode",
      status: "Live",
      budget: "₱85,000",
      goals: "Sell out 1st batch of 2,000 units with authentic QR guarantee"
    },
    {
      id: "camp-04",
      name: "11.11 Mega Wellness Bonanza",
      type: "sale",
      start_date: "2026-11-01",
      end_date: "2026-11-13",
      brand_partner: "All 320+ Verified Sellers",
      status: "Proposed",
      budget: "₱250,000",
      goals: "Biggest e-commerce weekend of Q4; Gaurav Shukla reporting deliverable"
    },
    {
      id: "camp-05",
      name: "Cocobody Holiday Co-Marketing Window",
      type: "co-marketing",
      start_date: "2026-11-15",
      end_date: "2026-12-24",
      brand_partner: "Cocobody Philippines",
      status: "Proposed",
      budget: "₱60,000",
      goals: "Promote local organic export-grade virgin coconut wellness"
    }
  ],

  competitorNotes: [
    {
      id: "comp-01",
      competitor_name: "Shopee Grey-Market Resellers",
      observation: "Flooding TikTok with ₱499 Rhode Lip Tints claiming 'overseas duty free overrun'. Over 40 comments asking if it is fake. Opportunity for Zenska to post direct comparison video showing authentic hologram seals.",
      date_logged: "2026-09-20",
      source_url: "https://shopee.ph/search?keyword=rhode+peptide",
      tag: "Counterfeit Watch"
    },
    {
      id: "comp-02",
      competitor_name: "Lazada Mall Official Flagships",
      observation: "Running 15% brand cashback vouchers for payday. Delivery speed 3-5 days in NCR. Zenska's 24-hour Metro Manila dispatch + Ask Zena routine recommendation is our key edge.",
      date_logged: "2026-09-18",
      source_url: "https://lazada.com.ph",
      tag: "Pricing/Promo"
    },
    {
      id: "comp-03",
      competitor_name: "FDA Philippines Public Health Advisory",
      observation: "FDA published Advisory No. 2026-0811 warning against 14 unnotified Korean cosmetic toners with heavy metal contamination sold on social media. Excellent educational hook for our 'Trust First' content pillar.",
      date_logged: "2026-09-19",
      source_url: "https://fda.gov.ph/advisories/cosmetics-2026",
      tag: "Regulatory"
    },
    {
      id: "comp-04",
      competitor_name: "Watsons Philippines",
      observation: "Pushing offline in-store derm analysis kiosks in Megamall & SM Aura. Our 'Ask Zena' 60-second mobile scan offers the same value from home without travel.",
      date_logged: "2026-09-15",
      source_url: "https://watsons.com.ph",
      tag: "Campaign Angle"
    }
  ]
};
