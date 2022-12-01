

const postView = async (client, userId, name) => {
    const today = new Date();

    //Check if today is morning, afternoon, or evening
    const hour = today.getHours();


    if (hour < 12) {
        var greeting = "Good morning";
    }
    else if (hour < 18) {
        var greeting = "Good afternoon";
    }
    else {
        var greeting = "Good evening";
    }

    const blocks = [
        {
            type: 'header',
            text: {
                type: 'plain_text',
                text: `${greeting}, ${name}!`,
                emoji: true,
            },
        },

        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: " 🗣 *Ask Away*\n_Ask one of our therapists about your feelings, health and wellbeing, friendships and even your purpose. We'll answer any question within 48hrs. _",
            },
            accessory: {
                type: 'button',
                text: {
                    type: 'plain_text',
                    text: 'Ask Us',
                    emoji: true,
                },
                value: 'click_me_123',
                url: 'https://mindmattr.com/ask-us/',
                action_id: 'button-action',
            },
        },
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: " 🙎 *Work Worries*\n_Ask questions related to your working life. We'll attempt to help you find the answers you seek. From appliyng for promotions to managing conflict in the workspace_",
            },
            accessory: {
                type: 'button',
                text: {
                    type: 'plain_text',
                    text: 'Ask Us',
                    emoji: true,
                },
                value: 'click_me_123',
                url: 'https://mindmattr.com/ask-us/',
                action_id: 'button-action',
            },
        },
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: '📅 *Book a session*\n_Book a session with a therapist to talk about your feelings, career, friendships and relationships. This is a great way to get things off your chest and speak to a professional about your feelings and emotions. There’s no commitment, and it is a great place to start if you’re new to therapy._',
            },
            accessory: {
                type: 'button',
                text: {
                    type: 'plain_text',
                    text: 'Book a session',
                    emoji: true,
                },
                value: 'click_me_123',
                url: 'http://mindmattr.com/book-appointment/',
                action_id: 'button-action',
            },
        },
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: '🧑‍⚕️ *Book a course of Therapy*\n_Book an initial consultation with a therapist. Our consultation is the first step. This is where you and your therapist will work out a plan for your course of therapy._',
            },
            accessory: {
                type: 'button',
                text: {
                    type: 'plain_text',
                    text: 'Book a Course',
                    emoji: true,
                },
                value: 'click_me_123',
                url: 'http://mindmattr.com/book-a-course/',
                action_id: 'button-action',
            },
        },
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: '💆 *Mental Health Coach*\n_We get that therapy might be daunting for people, so we have in-house mental health coaches for employees who feel they could benefit from coaching and mentorship. To further their careers and create a sense of purpose and fulfilment._',
            },
            accessory: {
                type: 'button',
                text: {
                    type: 'plain_text',
                    text: 'Apply for Coaching',
                    emoji: true,
                },
                value: 'click_me_123',
                url: 'http://mindmattr.com/apply-for-coaching/',
                action_id: 'button-action',
            },
        },
        {
            type: 'header',
            text: {
                type: 'plain_text',
                text: '🧑💼 Managers Resources',
                emoji: true,
            },
        },
        {
            type: 'divider',
        },
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: '*Team Check In*\n_(Check in with your team, to get an idea of how they are feeling. This could be; how the meeting went. How are they feel about the week ahead.)_',
            },
        },
        {
            type: 'actions',
            elements: [
                {
                    type: 'button',
                    text: {
                        type: 'plain_text',
                        text: 'Check in with team',
                        emoji: true,
                    },
                    value: 'click_me_123',
                    action_id: 'checkinwithteam',
                },
            ],
        },
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: '*Poll*\n_(An anonymous poll that allows your team to express themselves with complete anonymity)_',
            },
        },
        {
            type: 'actions',
            elements: [
                {
                    type: 'button',
                    text: {
                        type: 'plain_text',
                        text: 'Check in with team',
                        emoji: true,
                    },
                    value: 'click_me_123',
                    action_id: 'poll',
                },
            ],
        },
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: '*Empathy Training* `Coming Soon`\n_((We often thrust managers into their roles with little training or help with managing teams. Empathy plays a huge part in what makes a brilliant manager. Our 1-2-1 Empathy Training For Managers is great for new managers or those looking to improve their managerial skillset))_',
            },
        },
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: '*Confidence Training* `Coming Soon`\n_(Often minorities and women struggle within the workplace, they are more likely to pass up on promotions. Did you know women need to meet 100% of a job spec compared to men who only need to fill 60% of it? Empower your team with a comprehensive confidence training programme.)_',
            },
        },
        {
            type: 'header',
            text: {
                type: 'plain_text',
                text: '🧠 Mindfulness',
                emoji: true,
            },
        },
        {
            type: 'divider',
        },
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: '`Coming soon`',
            },
        },
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: '*MindGym*\n_*Meditation Playlist*_\n_Mental fitness is important for performance in the workspace and at home. A healthy and fit mind is key to our happiness_',
            },
        },
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: '*Nutrition*\n_Learn the impact of meditation, sound therapy and breathing work. Our live weekly classes are great for busy teams._',
            },
        },
        {
            type: 'header',
            text: {
                type: 'plain_text',
                text: '🆘 Helplines',
                emoji: true,
            },
        },
        {
            type: 'divider',
        },
        {
            type: 'context',
            elements: [
                {
                    type: 'mrkdwn',
                    text: "Call 116 123 to talk to Samaritans, or email: jo@samaritans.org for a reply within 24 hours\nText 'SHOUT' to 85285 to contact the Shout Crisis Line",
                },
            ],
        },
    ];

    await client.views.publish({
        user_id: userId,
        view: {
            type: 'home',
            blocks,
        },
    });
}

module.exports = { postView }