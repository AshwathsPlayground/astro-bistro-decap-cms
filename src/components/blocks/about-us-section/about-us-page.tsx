import type { ComponentType } from 'react'

import { ArrowRightIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

type Stat = {
  icon: ComponentType
  value: string
  description: string[]
}

type AboutUsProps = {
  stats: Stat[]
  badge?: string
  title?: string
  description?: string
  readMoreLink?: string
  image?: string
}

const AboutUs = ({
  stats,
  badge: propBadge,
  title: propTitle,
  description: propDescription,
  readMoreLink: propReadMoreLink,
  image: propImage
}: AboutUsProps) => {
  const badge = propBadge || 'About Us'
  const title = propTitle || 'Our story & achievements'
  const description = propDescription || "At Restaurant, every dish tells a story. With years of dedication and a passion for fine dining, we've transformed the art of cooking into an unforgettable experience."
  const readMoreLink = propReadMoreLink || '#'
  const image = propImage || '/images/about-us.webp'

  return (
    <section
      id='about-us'
      className='before:bg-muted relative py-8 before:absolute before:inset-0 before:-z-10 before:skew-y-3 sm:py-16 lg:py-24'
    >
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        {(badge || title || description) && (
          <div className='mx-auto mb-12 flex max-w-3xl flex-col items-center justify-center space-y-4 text-center md:mb-16 lg:mb-24'>
            {badge && (
              <Badge variant='outline' className='h-auto text-sm font-normal'>
                {badge}
              </Badge>
            )}
            {title && <h2 className='text-2xl font-semibold tracking-tight md:text-3xl lg:text-4xl'>{title}</h2>}
            {description && (
              <p className='text-muted-foreground text-xl'>
                {description}
              </p>
            )}
            {readMoreLink && (
              <Button
                size='lg'
                asChild
                className='group relative w-fit overflow-hidden rounded-full text-base before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-[position:-100%_0,0_0] has-[>svg]:px-6 dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.2)_50%,transparent_75%,transparent_100%)]'
              >
                <a href={readMoreLink}>
                  Read more
                  <ArrowRightIcon className='transition-transform duration-200 group-hover:translate-x-0.5' />
                </a>
              </Button>
            )}
          </div>
        )}

        {/* Video player and stats */}
        <div className='relative mb-8 h-full w-full sm:mb-16 lg:mb-24'>
          {image && (
            <img
              src={image}
              alt='About us illustration'
              className='h-full w-full object-cover'
              loading='lazy'
            />
          )}

          {/* Stats card overlapping the video section */}
          {stats && stats.length > 0 && (
            <div className='bg-background grid gap-10 border p-8 sm:max-lg:grid-cols-2 lg:absolute lg:-bottom-25 lg:left-1/2 lg:w-3/4 lg:-translate-x-1/2 lg:grid-cols-4 lg:px-10'>
              {stats.map((stat, index) => (
                <div key={index} className='flex flex-col items-center justify-center gap-2.5 text-center'>
                  <div className='flex size-7 items-center justify-center [&>svg]:size-7'>
                    {stat.icon && <stat.icon />}
                  </div>
                  {stat.value && <span className='text-2xl font-semibold'>{stat.value}</span>}
                  {stat.description && (
                    <p className='text-muted-foreground text-lg'>
                      {stat.description[0]}
                      {stat.description[1] && (
                        <>
                          <br /> {stat.description[1]}
                        </>
                      )}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default AboutUs
