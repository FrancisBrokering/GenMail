import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'ja',
    resources: {
      en: {
        translation: {
          logo: "GenMail",
          sidebar: {
            home: "Home",
            email: "Email",
            sns: "SNS",
            chat: "Chat",
            trend: "Trending",
            favorite: "Favorites",
            settings: "Settings",
          },
          email: {
            option: "Option",
            tone: {
              button: "Select a Tone",
              friendly: "Friendly",
              formal: "Formal",
              angry: "Angry",
              casual: "Casual",
              professional: "Professional",
            },
            newEmail: {
              examples: {
                about: "e.g. not going to work tomorrow",
                who: "e.g. my boss",
              },
              option: "Generate New Email",
              pageTitle: "Generate Your Email",
              button: "Generate Email",
              about: "What is this Email about?",
              who: "Who is this Email for?",
              tone: "Chose a tone",
            },
            replyEmail: {
              examples: {
                what: "e.g. available at 2pm on Tuesday",
              },
              option: "Generate Reply",
              pageTitle: "Generate Email Reply",
              button: "Generate Reply",
              paste: "Paste the Email you received",
              what: "(optional) What do you want to say?",
              tone: "Chose a tone",
            },
            editEmail: {
              examples: {
                how: "e.g. Inform the receiver that I am very busy tomorrow",
              },
              option: "Edit Email",
              pageTitle: "Edit Your Email",
              button: "Edit Email",
              paste: "Paste the Email you want to edit",
              how: "How do you want to edit?",
            },
            reviewEmail: {
              option: "Review Email",
              pageTitle: "Review Your Email",
              button: "Cleanup Email",
              paste: "Paste the Email you want to review",
            },
          }
        }
      },
      ja: {
        translation: {
          logo: "ジェネメール",
          sidebar: {
            home: "ホーム",
            email: "Eメール",
            sns: "SNS",
            chat: "チャット",
            trend: "トレンド",
            favorite: "お気に入り",
            settings: "設定",
          },
          email: {
            option: "オプション",
            tone: {
              button: "- 選択 -",
              friendly: "フレンドリー",
              formal: "フォーマル",
              angry: "怒り",
              casual: "カジュアル",
              professional: "プロフェッショナル",
            },
            newEmail: {
              examples: {
                about: "（例）明日仕事をを休む",
                who: "（例）上司",
              },
              option: "新規Eメールの生成",
              pageTitle: "新規Eメール",
              button: "生成",
              about: "Eメールの内容を入力してください",
              who: "宛名との関係を入力してください",
              tone: "口調を選択してください",
            },
            replyEmail: {
              examples: {
                what: "（例）火曜日の午後2時が好都合",
              },
              option: "Eメールの返信を生成",
              pageTitle: "返信の生成",
              button: "生成",
              paste: "送られてきたEメールを貼り付けてください（英語）",
              what: "（オプショナル）返信の内容を入力してください",
              tone: "口調を選択してください",
            },
            editEmail: {
              examples: {
                how: "（例）送り先に明日忙しいと伝える",
              },
              option: "Eメールの編集",
              pageTitle: "Eメールの編集",
              button: "編集",
              paste: "編集したいEメールを貼り付けてください",
              how: "編集内容を入力してください",
            },
            reviewEmail: {
              option: "Eメールの確認",
              pageTitle: "Eメールの確認",
              button: "確認",
              paste: "確認したいEメールを貼り付けてください",
            },
          }
        }
      },
    },
    debug: process.env.NODE_ENV === "development",
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n