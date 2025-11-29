import { useState, useEffect, useRef } from 'react';
import {
    profileService,
    projectsService,
    skillsService,
    experienceService,
    socialLinksService
} from '../services/api';
import { siteData } from '../data';

/**
 * Custom hook to fetch portfolio data from API with fallback to local data
 * Implements retry logic: loads backup profile.json immediately, then retries API 5 times
 * @returns {Object} Portfolio data and loading state
 */
export const usePortfolioData = () => {
    const [data, setData] = useState({
        profile: null,
        projects: null,
        skills: null,
        isLoading: true,
        error: null,
        isUsingAPI: false
    });
    const retryCountRef = useRef(0);
    const maxRetries = 5;

    useEffect(() => {
        // Load backup data from profile.json immediately
        const loadBackupData = async () => {
            try {
                const response = await fetch('/profile.json');
                const backupData = await response.json();
                const transformedBackup = transformBackupData(backupData);
                setData({
                    ...transformedBackup,
                    isLoading: false,
                    error: null,
                    isUsingAPI: false
                });
            } catch (error) {
                console.warn('Failed to load backup data, using hardcoded fallback:', error);
                setData({
                    profile: siteData.personal,
                    projects: siteData.projects,
                    skills: siteData.about.skills,
                    hero: siteData.hero,
                    about: siteData.about,
                    experience: siteData.experience,
                    contact: siteData.contact,
                    navigation: siteData.navigation,
                    footer: siteData.footer,
                    isLoading: false,
                    error: error.message,
                    isUsingAPI: false
                });
            }
        };

        const fetchData = async () => {
            try {
                // Attempt to fetch all data from API in parallel
                const [
                    profileResponse,
                    projectsResponse,
                    skillsResponse,
                    experienceResponse,
                    socialLinksResponse
                ] = await Promise.all([
                    profileService.getProfile(),
                    projectsService.getProjects(),
                    skillsService.getSkills(),
                    experienceService.getExperience(),
                    socialLinksService.getSocialLinks()
                ]);

                // Accept partial API responses: merge available API data with local fallback
                const anySuccess = profileResponse.success || projectsResponse.success || skillsResponse.success || experienceResponse.success || socialLinksResponse.success;

                if (anySuccess) {
                    // pass safe defaults for arrays/objects when an endpoint failed
                    const transformedData = transformAPIData(
                        profileResponse.success ? profileResponse.data : {},
                        projectsResponse.success ? projectsResponse.data : [],
                        skillsResponse.success ? skillsResponse.data : [],
                        experienceResponse.success ? experienceResponse.data : [],
                        socialLinksResponse.success ? socialLinksResponse.data : []
                    );

                    setData({
                        ...transformedData,
                        isLoading: false,
                        error: null,
                        isUsingAPI: true
                    });
                    retryCountRef.current = maxRetries; // Stop retrying on success
                } else {
                    throw new Error('No API data available');
                }
            } catch (error) {
                console.warn(`API fetch attempt ${retryCountRef.current + 1} failed:`, error);

                // Retry logic: if we haven't exceeded max retries, try again
                if (retryCountRef.current < maxRetries) {
                    retryCountRef.current += 1;
                    const retryDelay = 2000 * retryCountRef.current; // Exponential backoff
                    console.log(`Retrying API in ${retryDelay}ms (attempt ${retryCountRef.current}/${maxRetries})`);
                    setTimeout(fetchData, retryDelay);
                } else {
                    console.log('Max retries reached, staying with backup data');
                }
            }
        };

        // Load backup data first, then try API
        loadBackupData();
        fetchData();
    }, []);

    return data;
};

/**
 * Transform API data to match the component's expected structure
 */
function transformAPIData(profileData, projectsData, skillsData, experienceData, socialLinksData) {
    // Transform profile data
    const profile = {
        name: profileData.name || 'Developer',
        title: profileData.tagline || 'Full Stack Developer',
        tagline: profileData.tagline || 'Building amazing things',
        bio: profileData.bio || '',
        profileImage: profileData.avatar || '/images/profile.jpg',
        email: getEmailFromSocialLinks(socialLinksData),
        github_url: profileData.github_url || '',
        linkedin_url: profileData.linkedin_url || '',
        twitter_url: profileData.twitter_url || '',
        medium_url: profileData.medium_url || '',
        kaggle_url: profileData.kaggle_url || '',
        resume: profileData.resume || ''
    };

    // If social links are provided via API, prefer them for profile social URLs
    if (socialLinksData && Array.isArray(socialLinksData) && socialLinksData.length > 0) {
        socialLinksData.forEach(link => {
            const platform = (link.platform || '').toLowerCase();
            if (platform.includes('github') && !profile.github_url) profile.github_url = link.url;
            if (platform.includes('linkedin') && !profile.linkedin_url) profile.linkedin_url = link.url;
            if ((platform.includes('twitter') || platform.includes('x')) && !profile.twitter_url) profile.twitter_url = link.url;
            if (platform.includes('medium') && !profile.medium_url) profile.medium_url = link.url;
            if (platform.includes('kaggle') && !profile.kaggle_url) profile.kaggle_url = link.url;
            if ((platform.includes('email') || (link.url || '').startsWith('mailto:')) && !profile.email) profile.email = getEmailFromSocialLinks(socialLinksData);
        });
    }

    // Transform hero data
    const hero = {
        greeting: "Hi, I'm",
        name: profileData.name || 'Developer',
        title: profileData.tagline || 'Full Stack Developer',
        tagline: profileData.bio ? profileData.bio.split('.')[0] + '.' : 'Building amazing things',
        codeSnippets: [
            'const ME = "Software Developer";',
            'function innovate() { return future; }',
            'while(learning) { evolve(); }',
            'ME.find("thrill_in_speed"); // F1 & road trips',
            'ME.create("culinary_masterpieces"); // Cooking & baking',
            'return ME.readyForNextChallenge();'
        ],
        ctaButtons: [
            {
                text: "View My Work",
                href: "#projects",
                primary: true
            },
            {
                text: "Get In Touch",
                href: "#contact",
                primary: false
            }
        ]
    };

    // Transform projects data
    const projects = {
        title: "Featured Projects",
        subtitle: "A collection of my recent work and contributions",
        projects: projectsData.map(project => ({
            id: project.id,
            title: project.title,
            description: project.description,
            status: project.is_featured ? "Featured" : "Live",
            category: getCategoryFromTechStack(project.tech_stack),
            link: project.live_url || '',
            github: project.github_url || '',
            tech: project.tech_stack.map(skill => skill.name),
            image: project.cover_image,
            icon: getIconForProject(project.title),
            featured: project.is_featured,
            slug: project.slug,
            bentoSize: project.bento_size
        })),
        categories: ["All", ...getUniqueCategories(skillsData)]
    };

    // Transform skills data - sort by proficiency and select dynamically based on character count
    const sortedSkills = [...skillsData].sort((a, b) => (b.proficiency || 0) - (a.proficiency || 0));
    
    // Select skills until we reach approximately 100-120 characters (good for all screen sizes)
    const targetCharCount = 110;
    let charCount = 0;
    const selectedSkills = [];
    
    for (const skill of sortedSkills) {
        const skillLength = skill.name.length;
        if (charCount + skillLength <= targetCharCount || selectedSkills.length < 6) {
            selectedSkills.push(skill);
            charCount += skillLength;
        } else if (selectedSkills.length >= 6) {
            break;
        }
    }
    
    const skills = selectedSkills.map(skill => skill.name);

    // Group skills by category (use selected skills only)
    const skillsByCategory = groupSkillsByCategory(selectedSkills);

    // Transform experience data
    const works = experienceData.map(exp => ({
        id: exp.id,
        org: {
            name: exp.company_name,
            website: exp.company_website || '#'
        },
        role: exp.role,
        duration: {
            from: exp.start_date,
            to: exp.end_date || null
        },
        location: exp.location || 'Remote',
        description: exp.description || '',
        tech: exp.tech_stack.map(skill => skill.name),
        icon: getIconForRole(exp.role)
    }));

    // Transform about data
    const about = {
        description: profileData.bio || 'Passionate developer building innovative solutions.',
        skills: skills,
        skillsByCategory: skillsByCategory,
        funFacts: [
            { emoji: '🏎️', text: 'Racing' },
            { emoji: '🎨', text: 'Art' },
            { emoji: '🌙', text: 'Dreams' }
        ],
        experience: {
            years: calculateYearsOfExperience(works),
            projects: projectsData.length,
            works: works,
            latestWork: getLatestWork(works)
        },
        interests: [
            "Formula 1 Racing",
            "Culinary Arts",
            "Cloud Architecture",
            "Open Source Contributions",
            "Travel & Photography"
        ]
    };

    // Transform experience data
    const experience = {
        title: "Work Experience",
        subtitle: "A summary of my professional journey",
        works: works
    };

    // Transform contact data with social links
    const contact = {
        ...siteData.contact,
        contactInfo: {
            ...siteData.contact.contactInfo,
            email: getEmailFromSocialLinks(socialLinksData)
        },
        socialLinks: transformSocialLinks(socialLinksData, profileData)
    };

    return {
        profile,
        hero,
        projects,
        skills,
        about,
        experience,
        contact,
        navigation: siteData.navigation,
        footer: {
            ...siteData.footer,
            socialLinks: transformSocialLinks(socialLinksData, profileData)
        }
    };
}

/**
 * Get category from tech stack
 */
function getCategoryFromTechStack(techStack) {
    if (!techStack || techStack.length === 0) return "Other";

    const categories = techStack.map(skill => skill.category);
    const categoryMap = {
        'FE': 'Frontend',
        'BE': 'Backend',
        'DO': 'DevOps',
        'AI': 'AI/ML',
        'OT': 'Other'
    };

    // Return the first category or default
    return categoryMap[categories[0]] || "Other";
}

/**
 * Get unique categories from skills
 */
function getUniqueCategories(skills) {
    const categoryMap = {
        'FE': 'Frontend',
        'BE': 'Backend',
        'DO': 'DevOps',
        'AI': 'AI/ML',
        'OT': 'Other'
    };

    const categories = [...new Set(skills.map(skill => categoryMap[skill.category] || 'Other'))];
    return categories;
}

/**
 * Group skills by category
 */
function groupSkillsByCategory(skills) {
    const categoryMap = {
        'FE': 'Frontend',
        'BE': 'Backend',
        'DO': 'DevOps',
        'AI': 'AI/ML',
        'OT': 'Other'
    };

    const grouped = {};
    skills.forEach(skill => {
        const category = categoryMap[skill.category] || 'Other';
        if (!grouped[category]) {
            grouped[category] = [];
        }
        grouped[category].push({
            name: skill.name,
            icon_url: skill.icon_url
        });
    });

    return grouped;
}

/**
 * Get icon emoji for project based on title
 */
function getIconForProject(title) {
    const iconMap = {
        'movie': '🎬',
        'google': '🔍',
        'portfolio': '💼',
        'e-commerce': '🛒',
        'blog': '📝',
        'chat': '💬',
        'default': '🚀'
    };

    const key = title.toLowerCase();
    for (const [keyword, icon] of Object.entries(iconMap)) {
        if (key.includes(keyword)) {
            return icon;
        }
    }

    return iconMap.default;
}

/**
 * Get icon emoji for role
 */
function getIconForRole(role) {
    const iconMap = {
        'intern': '🖥️',
        'junior': '🌱',
        'senior': '🚀',
        'lead': '👨‍💼',
        'developer': '💻',
        'engineer': '⚙️',
        'architect': '🏗️',
        'default': '💼'
    };

    const key = role.toLowerCase();
    for (const [keyword, icon] of Object.entries(iconMap)) {
        if (key.includes(keyword)) {
            return icon;
        }
    }

    return iconMap.default;
}

/**
 * Calculate years of experience from work history
 */
function calculateYearsOfExperience(works) {
    if (!works || works.length === 0) return '0';

    const oldestWork = works.reduce((oldest, work) => {
        const oldestDate = new Date(oldest.duration.from);
        const workDate = new Date(work.duration.from);
        return workDate < oldestDate ? work : oldest;
    }, works[0]);

    const startDate = new Date(oldestWork.duration.from);
    const now = new Date();
    const years = Math.floor((now - startDate) / (365.25 * 24 * 60 * 60 * 1000));

    return `${years}+`;
}

/**
 * Get latest work from work history
 */
function getLatestWork(works) {
    if (!works || works.length === 0) return null;

    const latestWork = works.reduce((latest, work) => {
        const latestFrom = new Date(latest.duration.from);
        const workFrom = new Date(work.duration.from);
        return workFrom > latestFrom ? work : latest;
    }, works[0]);

    const toDate = latestWork.duration.to ? new Date(latestWork.duration.to) : null;
    if (toDate && toDate < new Date()) {
        return null;
    }
    return latestWork;
}

/**
 * Get email from social links
 */
function getEmailFromSocialLinks(socialLinks) {
    if (!socialLinks || socialLinks.length === 0) return 'contact@aigamer.dev';

    const emailLink = socialLinks.find(link =>
        link.platform.toLowerCase() === 'email' ||
        link.url.includes('mailto:')
    );

    if (emailLink) {
        return emailLink.url.replace('mailto:', '');
    }

    return 'contact@aigamer.dev';
}

/**
 * Transform social links from API to component format
 */
function transformSocialLinks(socialLinks, profileData) {
    const defaultLinks = [
        {
            platform: "GitHub",
            url: profileData.github_url || "https://github.com",
            icon: "github"
        },
        {
            platform: "LinkedIn",
            url: profileData.linkedin_url || "https://linkedin.com",
            icon: "linkedin"
        },
        {
            platform: "Twitter",
            url: profileData.twitter_url || "https://twitter.com",
            icon: "twitter"
        },
        {
            platform: "Email",
            url: `mailto:${getEmailFromSocialLinks(socialLinks)}`,
            icon: "email"
        }
    ];

    if (!socialLinks || socialLinks.length === 0) {
        return defaultLinks;
    }

    return socialLinks.map(link => ({
        platform: link.platform,
        url: link.url,
        icon: getPlatformIcon(link.platform)
    }));
}

/**
 * Get icon name for platform
 */
function getPlatformIcon(platform) {
    const iconMap = {
        'github': 'github',
        'linkedin': 'linkedin',
        'twitter': 'twitter',
        'email': 'email',
        'medium': 'medium',
        'kaggle': 'kaggle',
        'instagram': 'instagram',
        'facebook': 'facebook',
        'youtube': 'youtube'
    };

    return iconMap[platform.toLowerCase()] || 'link';
}

/**
 * Transform backup profile.json data to match component structure
 */
function transformBackupData(backupData) {
    return transformAPIData(
        backupData.profile || {},
        backupData.projects || [],
        backupData.skills || [],
        backupData.experience || [],
        backupData.social_links || []
    );
}
