'use client'

import { useState, useRef } from 'react'
import html2canvas from 'html2canvas'

interface EmailData {
  type: 'update' | 'suspension' | 'congratulations' | 'thankyou'
  recipientName: string
  companyName: string
  senderName: string
  senderTitle: string
  customMessage: string
  date: string
}

const templates = {
  update: {
    subject: 'Important Account Update',
    title: 'Account Update Notice',
    icon: '🔔',
    color: 'blue'
  },
  suspension: {
    subject: 'Account Suspension Notice',
    title: 'Account Suspension Alert',
    icon: '⚠️',
    color: 'red'
  },
  congratulations: {
    subject: 'Congratulations!',
    title: 'Congratulations',
    icon: '🎉',
    color: 'green'
  },
  thankyou: {
    subject: 'Thank You',
    title: 'Thank You',
    icon: '💙',
    color: 'purple'
  }
}

export default function Home() {
  const [emailData, setEmailData] = useState<EmailData>({
    type: 'update',
    recipientName: 'John Smith',
    companyName: 'TechCorp Inc.',
    senderName: 'Sarah Johnson',
    senderTitle: 'Customer Success Manager',
    customMessage: '',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  })

  const emailRef = useRef<HTMLDivElement>(null)

  const getDefaultMessage = (type: string) => {
    switch(type) {
      case 'update':
        return 'We wanted to inform you about important updates to your account. Please review the changes and contact us if you have any questions.'
      case 'suspension':
        return 'We regret to inform you that your account has been temporarily suspended due to unusual activity. Please contact our support team to resolve this issue.'
      case 'congratulations':
        return 'We are delighted to congratulate you on your achievement! Your dedication and hard work have truly paid off. We look forward to your continued success.'
      case 'thankyou':
        return 'Thank you for being a valued member of our community. We truly appreciate your continued support and trust in our services.'
      default:
        return ''
    }
  }

  const handleDownload = async () => {
    if (emailRef.current) {
      const canvas = await html2canvas(emailRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false
      })
      const link = document.createElement('a')
      link.download = `${emailData.type}-notice-${Date.now()}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    }
  }

  const template = templates[emailData.type]
  const message = emailData.customMessage || getDefaultMessage(emailData.type)

  const colorClasses = {
    blue: { bg: 'bg-blue-600', text: 'text-blue-600', border: 'border-blue-600' },
    red: { bg: 'bg-red-600', text: 'text-red-600', border: 'border-red-600' },
    green: { bg: 'bg-green-600', text: 'text-green-600', border: 'border-green-600' },
    purple: { bg: 'bg-purple-600', text: 'text-purple-600', border: 'border-purple-600' }
  }

  const colors = colorClasses[template.color as keyof typeof colorClasses]

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
          Professional Email Notice Generator
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Create realistic and professional email notifications
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Control Panel */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Customize Notice</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Notice Type
                </label>
                <select
                  value={emailData.type}
                  onChange={(e) => setEmailData({...emailData, type: e.target.value as any, customMessage: ''})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="update">Update Notice</option>
                  <option value="suspension">Suspension Alert</option>
                  <option value="congratulations">Congratulations</option>
                  <option value="thankyou">Thank You</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Recipient Name
                </label>
                <input
                  type="text"
                  value={emailData.recipientName}
                  onChange={(e) => setEmailData({...emailData, recipientName: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value={emailData.companyName}
                  onChange={(e) => setEmailData({...emailData, companyName: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sender Name
                </label>
                <input
                  type="text"
                  value={emailData.senderName}
                  onChange={(e) => setEmailData({...emailData, senderName: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sender Title
                </label>
                <input
                  type="text"
                  value={emailData.senderTitle}
                  onChange={(e) => setEmailData({...emailData, senderTitle: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Custom Message (Optional)
                </label>
                <textarea
                  value={emailData.customMessage}
                  onChange={(e) => setEmailData({...emailData, customMessage: e.target.value})}
                  placeholder={getDefaultMessage(emailData.type)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button
                onClick={handleDownload}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 shadow-lg"
              >
                Download as Image
              </button>
            </div>
          </div>

          {/* Email Preview */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Preview</h2>

            <div ref={emailRef} className="bg-white">
              {/* Email Header */}
              <div className={`${colors.bg} text-white p-6 rounded-t-lg`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{template.icon}</div>
                    <div>
                      <div className="text-sm opacity-90">{emailData.companyName}</div>
                      <div className="text-xl font-bold">{template.title}</div>
                    </div>
                  </div>
                  <div className="text-sm opacity-90">{emailData.date}</div>
                </div>
              </div>

              {/* Email Body */}
              <div className="p-8 bg-gray-50 border-l-4 border-r-4 border-gray-200">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <p className="text-gray-800 mb-4">
                    Dear <span className="font-semibold">{emailData.recipientName}</span>,
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    {message}
                  </p>

                  {emailData.type === 'suspension' && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                      <p className="text-sm text-red-800 font-semibold">
                        Action Required: Please contact support within 48 hours to restore your account access.
                      </p>
                    </div>
                  )}

                  {emailData.type === 'update' && (
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                      <p className="text-sm text-blue-800 font-semibold">
                        These changes will take effect within 24 hours. No action is required on your part.
                      </p>
                    </div>
                  )}

                  <p className="text-gray-700 mb-6">
                    If you have any questions or concerns, please don't hesitate to reach out to our support team.
                  </p>

                  <div className="border-t border-gray-200 pt-4 mt-6">
                    <p className="text-gray-800 font-semibold">{emailData.senderName}</p>
                    <p className="text-gray-600 text-sm">{emailData.senderTitle}</p>
                    <p className="text-gray-600 text-sm">{emailData.companyName}</p>
                  </div>
                </div>
              </div>

              {/* Email Footer */}
              <div className="bg-gray-800 text-white p-6 rounded-b-lg text-sm">
                <div className="text-center space-y-2">
                  <p className="font-semibold">{emailData.companyName}</p>
                  <p className="text-gray-400">
                    123 Business Street, Suite 100 | City, State 12345
                  </p>
                  <p className="text-gray-400">
                    support@{emailData.companyName.toLowerCase().replace(/\s+/g, '')}.com | (555) 123-4567
                  </p>
                  <div className="pt-2 border-t border-gray-700 mt-4">
                    <p className="text-gray-400 text-xs">
                      This is an automated notification. Please do not reply to this email.
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      © {new Date().getFullYear()} {emailData.companyName}. All rights reserved.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
