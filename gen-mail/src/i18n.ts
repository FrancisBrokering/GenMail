import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: "ja",
    resources: {
      en: {
        translation: {
          logo: "GenMail",
          copy: "Copy",
          copied: "Copied!",
          darkMode: "Dark Mode",
          lightMode: "Light Mode",
          japanese: "Japanese",
          english: "English",
          spanish: "Spanish",
          french: "French",
          german: "Germany",
          italian: "Italian",
          other: "Other",
          editor: {
            placeHolder: "Paste your text here...",
            plainText: "Paste as plain text",
          },
          sidebar: {
            home: "Home",
            email: "Email",
            sns: "SNS",
            chat: "Chat",
            trend: "Trending",
            favorite: "Favorites",
            settings: "Settings",
          },
          selectLang: "Select a language",
          generating: "Generating",
          tone: {
            label: "Chose a tone",
            button: "Select a Tone",
            friendly: "Friendly",
            formal: "Formal",
            angry: "Angry",
            casual: "Casual",
            sad: "Sad",
            professional: "Professional",
          },
          email: {
            option: "Option",
            newEmail: {
              examples: {
                about: "e.g. not going to work tomorrow",
                who: "e.g. my boss",
              },
              option: "New",
              pageTitle: "Generate Your Email",
              button: "Generate",
              about: "What is this Email about?",
              who: "Who is this Email for?",
            },
            replyEmail: {
              examples: {
                what: "e.g. available at 2pm on Tuesday",
              },
              option: "Reply",
              pageTitle: "Generate Email Reply",
              button: "Generate",
              paste: "Paste the Email you received",
              what: "(optional) What do you want to say?",
            },
            editEmail: {
              examples: {
                how: "e.g. Inform the receiver that I am very busy tomorrow",
              },
              option: "Edit",
              pageTitle: "Edit Your Email",
              button: "Generate",
              paste: "Paste the Email you want to edit",
              how: "How do you want to edit?",
            },
            reviewEmail: {
              option: "Review",
              pageTitle: "Review Your Email",
              button: "Review",
              paste: "Paste the Email you want to review",
            },
          },
          sns: {
            platform: {
              button: "Select a Platform",
              twitter: "Twitter",
              facebook: "Facebook",
              instagram: "Instagram",
              youtube: "YouTube",
              linkedin: "LinkedIn",
            },
            newSns: {
              examples: {
                about: "e.g. I went to Hawaii",
              },
              about: "What should this post be about?",
              platform: "Select a Platform",
              option: "New Post",
              pageTitle: "Generate SNS Post",
              button: "Generate",
            },
          },
          chat: {
            replyChat: {
              examples: {
                what: "e.g. available at 2pm on Tuesday",
              },
              option: "Reply",
              pageTitle: "Generate Chat Reply",
              button: "Generate",
              paste: "Paste the message you received",
              what: "(optional) What do you want to say?",
            },
          },
        },
      },
      ja: {
        translation: {
          logo: "ジェネメール",
          copy: "コピー",
          copied: "コピー完了",
          darkMode: "ダークモード",
          lightMode: "ライトモード",
          japanese: "日本語",
          english: "英語",
          spanish: "スペイン語",
          french: "フランス語",
          german: "ドイツ語",
          italian: "イタリア語",
          other: "その他",
          editor: {
            placeHolder: "テキストを貼り付けてください...",
            plainText: "プレーンテキストを貼り付け",
          },
          sidebar: {
            home: "ホーム",
            email: "Eメール",
            sns: "SNS",
            chat: "チャット",
            trend: "トレンド",
            favorite: "お気に入り",
            settings: "設定",
          },
          selectLang: "入力言語を選択してください",
          generating: "生成中",
          tone: {
            label: "口調を選択してください",
            button: "- 選択 -",
            friendly: "フレンドリー",
            formal: "フォーマル",
            angry: "怒り",
            casual: "カジュアル",
            sad: "悲しい",
            professional: "プロフェッショナル",
          },
          email: {
            option: "オプション",
            newEmail: {
              examples: {
                about:
                  "（例) 体調不良のため、明日のバイトを休む。ケビンがシフトの代わりを引き受ける。来週の火曜日には戻る予定。",
                who: "（例）上司",
              },
              option: "新規",
              pageTitle: "新規Eメールの生成",
              button: "生成",
              about: "Eメールの内容を入力してください",
              who: "宛名との関係を入力してください",
            },
            replyEmail: {
              examples: {
                what: "（例）今週の水曜日の午後2時が好都合。来週でも大丈夫なら月曜日と火曜日の午前中が可能。",
              },
              option: "返信",
              pageTitle: "Eメールの返信を生成",
              button: "生成",
              paste: "送られてきたEメールを貼り付けてください",
              what: "(オプショナル) 返信したい内容を入力してください",
            },
            editEmail: {
              examples: {
                how: "（例）送り先に明日忙しいと伝える",
              },
              option: "編集",
              pageTitle: "Eメールの編集",
              button: "編集",
              paste: "編集したいEメールを貼り付けてください",
              how: "編集内容を入力してください",
            },
            reviewEmail: {
              option: "確認",
              pageTitle: "Eメールの確認",
              button: "確認",
              paste: "確認したいEメールを貼り付けてください",
            },
          },
          sns: {
            platform: {
              button: "- 選択 -",
              twitter: "Twitter",
              facebook: "Facebook",
              instagram: "Instagram",
              youtube: "YouTube",
              linkedin: "LinkedIn",
            },
            newSns: {
              examples: {
                about:
                  "（例）ハワイ旅行に行って海亀を見た。ホテルからの景色は最高だった。また来年も行きたい。",
              },
              about: "SNSの投稿の内容を入力してください",
              platform: "プラットフォームを選択してください",
              option: "投稿の生成",
              pageTitle: "SNSの投稿を生成",
              button: "生成",
            },
          },
          chat: {
            replyChat: {
              examples: {
                what: "（例）火曜日の午後2時が好都合。貸していた本もその時返してほしい。",
              },
              option: "返信",
              pageTitle: "チャットの返信を生成",
              button: "生成",
              paste: "送られてきたチャットを貼り付けてください（英語）",
              what: "(オプショナル) 返信したい内容を入力してください",
            },
          },
        },
      },
    },
    debug: process.env.NODE_ENV === "development",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
