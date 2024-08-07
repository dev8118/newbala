import { useState, useEffect } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import Layout from 'src/@core/layouts/Layout'
import VerticalNavItems from 'src/navigation/vertical'
import HorizontalNavItems from 'src/navigation/horizontal'
import VerticalAppBarContent from './components/vertical/AppBarContent'
import HorizontalAppBarContent from './components/horizontal/AppBarContent'
import FooterContent from './components/horizontal/FooterContent'
import { useSettings } from 'src/@core/hooks/useSettings'
import Http from 'src/services/Http'

const UserLayout = ({ children, contentHeightFixed, menu }) => {
  const { settings, saveSettings } = useSettings()
  const [navItems, setNavItems] = useState([])

  const hidden = useMediaQuery(theme => theme.breakpoints.down('md'))
  if (hidden) {
    settings.layout = 'vertical'
  } else {
    settings.layout = 'horizontal'
  }

  return (
    <Layout
      hidden={hidden}
      settings={settings}
      saveSettings={saveSettings}
      contentHeightFixed={contentHeightFixed}
      verticalLayoutProps={{
        navMenu: {
          navItems: navItems
        },
        appBar: {
          content: props => (
            <VerticalAppBarContent
              hidden={hidden}
              settings={settings}
              saveSettings={saveSettings}
              toggleNavVisibility={props.toggleNavVisibility}
            />
          )
        }
      }}
      {...(settings.layout === 'horizontal' && {
        horizontalLayoutProps: {
          navMenu: {
            navItems: HorizontalNavItems()
          },
          appBar: {
            content: () => <HorizontalAppBarContent settings={settings} saveSettings={saveSettings} />
          }
        }
      })}
      footerProps={{
        content: props => <FooterContent />
      }}
    >
      {children}
    </Layout>
  )
}

export default UserLayout
