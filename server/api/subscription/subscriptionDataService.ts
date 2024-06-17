import type { SupabaseClient } from '@supabase/supabase-js'
import type { Subscription } from '../../types'
import logger from '~/utils/logger'
import { Database } from '~/server/supabase/types'
import supabaseClient from '~/server/supabase/supabaseClient'
import { objectToCamel } from 'ts-case-convert'

export default class SubscriptionDataService {
  private supabase: SupabaseClient<Database>

  constructor() {
    this.supabase = supabaseClient
  }

  public async create(
    userId: string,
    paymentPeriod: Subscription['paymentPeriod'],
    subscriptionType: Subscription['type']
  ): Promise<void> {
    const { error: insertSubscriptionError } = await this.supabase.from('subscription').insert({
      user_id: userId,
      payment_period: paymentPeriod,
      type: subscriptionType,
    })

    if (insertSubscriptionError) {
      throw logger.error(insertSubscriptionError.message, 'SubscriptionDataService - create', true)
    }
  }

  public async updateLastPayment(userId: Subscription['userId'], lastPaymentDate: Date): Promise<void> {
    const { error } = await this.supabase
      .from('subscription')
      .update({
        last_payment: lastPaymentDate.toDateString(),
      })
      .eq('user_id', userId)

    if (error) {
      throw logger.error(error.message, 'SubscriptionDataService - updateLastPayment', true, { userId })
    }
  }

  public async delete(userId: Subscription['userId']): Promise<void> {
    const { error } = await this.supabase.from('subscription').delete().eq('user_id', userId)

    if (error) {
      throw logger.error(error.message, 'SubscriptionDataService - delete', true, { userId })
    }
  }
}
