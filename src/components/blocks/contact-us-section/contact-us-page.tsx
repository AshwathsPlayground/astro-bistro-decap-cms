import type { ComponentType } from 'react'

import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

type ContactInfo = {
  title: string
  icon: ComponentType
  description: string
}[]

type ContactUsProps = {
  contactInfo: ContactInfo
  badge?: string
  title?: string
  description?: string
  image?: string
  rightTitle?: string
  rightDescription?: string
}

const ContactUs = ({
  contactInfo,
  badge: propBadge,
  title: propTitle,
  description: propDescription,
  image: propImage,
  rightTitle: propRightTitle,
  rightDescription: propRightDescription
}: ContactUsProps) => {
  const badge = propBadge || 'Contact Us'
  const title = propTitle || 'Get in touch with us'
  const description = propDescription || 'We eagerly look forward to warmly welcoming you very soon to our event. It promises to be a memorable experience filled with exciting activities.'
  const image = propImage || '/images/contact-us-01.webp'
  const rightTitle = propRightTitle || "We're here to serve you"
  const rightDescription = propRightDescription || "We would love to hear from you, Whether you have a question, need a reservation, or want to learn more about our offerings, we're here to assist."

  return (
    <section
      id='contact-us'
      className='before:bg-muted relative py-8 before:absolute before:inset-0 before:-z-10 before:skew-y-3 sm:py-16 lg:py-24'
    >
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        {(badge || title || description) && (
          <div className='mx-auto mb-12 flex max-w-2xl flex-col items-center justify-center space-y-4 text-center sm:mb-16 lg:mb-24'>
            {badge && (
              <Badge variant='outline' className='h-auto text-sm font-normal'>
                {badge}
              </Badge>
            )}
            {title && <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>{title}</h2>}
            {description && (
              <p className='text-muted-foreground text-xl'>
                {description}
              </p>
            )}
          </div>
        )}

        <div className='grid items-center gap-12 lg:grid-cols-2'>
          {image && (
            <img
              src={image}
              alt='Contact illustration'
              className='size-full object-cover max-lg:max-h-70'
              loading='lazy'
            />
          )}

          <div>
            {rightTitle && <h3 className='mb-2 text-2xl'>{rightTitle}</h3>}
            {rightDescription && (
              <p className='text-muted-foreground mb-10 text-lg'>
                {rightDescription}
              </p>
            )}

            {/* Contact Info Grid */}
            {contactInfo && contactInfo.length > 0 && (
              <div className='grid gap-6 sm:grid-cols-2'>
                {contactInfo.map((info, index) => (
                  <Card
                    className='bg-background hover:border-primary rounded-none border shadow-none ring-0 transition-colors duration-300'
                    key={index}
                  >
                    <CardContent className='flex flex-col items-center gap-4 text-center'>
                      <Avatar className='size-9'>
                        <AvatarFallback className='bg-transparent [&>svg]:size-5'>
                          {info.icon && <info.icon />}
                        </AvatarFallback>
                      </Avatar>
                      <div className='space-y-3'>
                        {info.title && <h4 className='text-lg font-semibold'>{info.title}</h4>}
                        {info.description && (
                          <div className='text-muted-foreground text-base font-medium'>
                            {(info.description || '').split('\n').map((line, idx) => (
                              <p key={idx}>{line}</p>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactUs
