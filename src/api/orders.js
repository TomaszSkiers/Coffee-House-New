// ordersAPI.js
import axios from 'axios'
import axiosClient from './axiosClient'
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

// Bazowy URL API (dostosuj, jeśli Twój backend działa pod innym adresem)
const API_BASE_URL = 'http://localhost:4001'

/**
 * Dodaje nowe zamówienie.
 * @param {Object} orderData - Obiekt zawierający dane zamówienia.
 * @param {string} token - Token autoryzacyjny JWT.
 * @returns {Promise<Object>} - Odpowiedź serwera.
 */
export const addOrder = async (orderData, token) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/orders`, orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error(
      'Błąd przy dodawaniu zamówienia:',
      error.response ? error.response.data : error.message
    )
  }
}

/**
 * Usuwa zamówienie o podanym identyfikatorze.
 * @param {number|string} orderId - Identyfikator zamówienia do usunięcia.
 * @param {string} token - Token autoryzacyjny JWT.
 * @returns {Promise<Object>} - Odpowiedź serwera.
 */
export const deleteOrder = async (orderId, token) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error(
      'Błąd przy usuwaniu zamówienia:',
      error.response ? error.response.data : error.message
    )
  }
}

export const useDeleteOrder = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const deleteOrder = async(orderId) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await axiosClient.delete(`orders/${orderId}`)
      console.log('zamówienie usunięte:', response.data)
      return response.data
    } catch (error) {
      console.error('błąd przy ususwaniu zamówienia:' ,
        error.response ? error.response.data : error.message
      )
      setError(error)
      throw error
    }finally{
      setIsLoading(false)
    }
  }

  return {deleteOrder, isLoading, error} 
}

/**
 * 
 * @param {string} token - Token autoryzacyjny
 * @returns {Promise<Objest>} - Odpowiedź z serwera
 */
export const getOrders = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error(
      'Błąd przy pobieraniu zamówień',
      error.response ? error.response.data : error.message
    )
  }
}

//* common hook useFetchOrders

    export const fetchOrders = async()  => {
      const response = await axiosClient.get('/orders')
      return response.data
    }

    export const useFetchOrders = () => {
      return useQuery({
        queryKey: ['orders'],
        queryFn: fetchOrders,
      })
    }