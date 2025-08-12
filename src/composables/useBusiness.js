// Business Management Composable
import { supabase } from './useSupabase'

export const useBusiness = () => {

  const createBusiness = async (businessData, userId, subscriptionId) => {
    try {
      // Prepare business data with only existing fields
      const businessInsertData = {
        owner_id: userId,
        subscription_id: subscriptionId,
        name: businessData.name,
        description: businessData.description || null,
        business_type: businessData.business_type || null,
        address: businessData.address || null,
        city: businessData.city || null,
        province: businessData.province || null,
        postal_code: businessData.postal_code || null,
        phone: businessData.phone || null,
        website: businessData.website || null,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      const { data: business, error: businessError } = await supabase
        .from('businesses')
        .insert(businessInsertData)
        .select()
        .single()

      if (businessError) {
        console.error('Business creation error:', businessError)
        throw businessError
      }

      console.log('Business created:', business)

      // Get Owner role template
      const { data: ownerRole, error: roleError } = await supabase
        .from('role_templates')
        .select('id')
        .eq('name', 'Owner')
        .eq('is_system_role', true)
        .single()

      if (roleError) {
        console.error('Error fetching Owner role:', roleError)
        console.log('Continuing without role assignment - business created successfully')
        return { success: true, data: business }
      }

      console.log('Owner role found:', ownerRole)

      // Add user as Owner to business_users table
      const businessUserData = {
        business_id: business.id,
        user_id: userId,
        role_template_id: ownerRole.id,
        position: 'Owner',
        department: 'Management',
        status: 'active',
        hire_date: new Date().toISOString().split('T')[0],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      console.log('Attempting to insert business user:', businessUserData)

      const { data: businessUser, error: businessUserError } = await supabase
        .from('business_users')
        .insert(businessUserData)
        .select()
        .single()

      if (businessUserError) {
        console.error('Error adding user to business:', businessUserError)
        console.error('Business user data attempted:', businessUserData)
        console.log('Business creation succeeded, but role assignment failed')
        // Don't throw error, business was created successfully
        return { success: true, data: business, warning: 'Role assignment failed' }
      }

      console.log('User added as Owner successfully:', businessUser)
      return { success: true, data: business, businessUser }
    } catch (error) {
      console.error('Error creating business:', error)
      return { success: false, error: error.message }
    }
  }

  const getUserBusinesses = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('businesses')
        .select(`
          *,
          user_subscriptions!inner(
            *,
            subscription_plans(*)
          )
        `)
        .eq('owner_id', userId)

      if (error) {
        throw error
      }

      return { success: true, data }
    } catch (error) {
      console.error('Error fetching businesses:', error)
      return { success: false, error: error.message }
    }
  }

  const updateBusiness = async (businessId, updates) => {
    try {
      const { data, error } = await supabase
        .from('businesses')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', businessId)
        .select()
        .single()

      if (error) {
        throw error
      }

      return { success: true, data }
    } catch (error) {
      console.error('Error updating business:', error)
      return { success: false, error: error.message }
    }
  }

  const getUserActiveSubscription = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('user_subscriptions')
        .select(`
          *,
          subscription_plans(*)
        `)
        .eq('user_id', userId)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (error) {
        throw error
      }

      return { success: true, data }
    } catch (error) {
      console.error('Error fetching active subscription:', error)
      return { success: false, error: error.message }
    }
  }

  const getUserBusinessRoles = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('business_users')
        .select(`
          *,
          businesses(*),
          role_templates(*)
        `)
        .eq('user_id', userId)
        .eq('status', 'active')

      if (error) {
        throw error
      }

      return { success: true, data }
    } catch (error) {
      console.error('Error fetching user business roles:', error)
      return { success: false, error: error.message }
    }
  }

  const getUserBusinessRole = async (userId, businessId) => {
    try {
      const { data, error } = await supabase
        .from('business_users')
        .select(`
          *,
          role_templates(*)
        `)
        .eq('user_id', userId)
        .eq('business_id', businessId)
        .eq('status', 'active')
        .single()

      if (error) {
        throw error
      }

      return { success: true, data }
    } catch (error) {
      console.error('Error fetching user business role:', error)
      return { success: false, error: error.message }
    }
  }

  return {
    createBusiness,
    getUserBusinesses,
    updateBusiness,
    getUserActiveSubscription,
    getUserBusinessRoles,
    getUserBusinessRole
  }
}
