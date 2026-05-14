import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../styles/HomeStyles';

type Category = 'Fruta' | 'Limpeza' | 'Bebida' | 'Outro';

interface Item {
  id: string;
  name: string;
  category: Category;
  purchased: boolean;
}

export default function HomeScreen() {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category>('Outro');

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    saveItems(items);
  }, [items]);

  const loadItems = async () => {
    try {
      const storedItems = await AsyncStorage.getItem('@mercadinho_items');
      if (storedItems) setItems(JSON.parse(storedItems));
    } catch (e) {
      console.error('Erro ao carregar itens:', e);
    }
  };

  const saveItems = async (newItems: Item[]) => {
    try {
      await AsyncStorage.setItem('@mercadinho_items', JSON.stringify(newItems));
    } catch (e) {
      console.error('Erro ao salvar itens:', e);
    }
  };

  const addItem = () => {
    if (name.trim() === '') {
      Alert.alert('Erro', 'O nome do item não pode ser vazio!');
      return;
    }
    const newItem: Item = {
      id: Date.now().toString(),
      name: name.trim(),
      category,
      purchased: false
    };
    setItems([...items, newItem]);
    setName('');
  };

  const togglePurchased = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, purchased: !item.purchased } : item
    ));
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const clearList = () => {
    Alert.alert('Limpar Lista', 'Tem certeza que deseja apagar todos os itens?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Apagar Tudo', style: 'destructive', onPress: () => setItems([]) }
    ]);
  };

  const purchasedCount = items.filter(i => i.purchased).length;
  const pendingCount = items.length - purchasedCount;

  const renderItem = ({ item }: { item: Item }) => (
    <View style={[styles.itemContainer, item.purchased && styles.itemPurchasedContainer]}>
      <TouchableOpacity style={styles.checkButton} onPress={() => togglePurchased(item.id)}>
        <Ionicons
          name={item.purchased ? "checkmark-circle" : "ellipse-outline"}
          size={24}
          color={item.purchased ? "#4CAF50" : "#757575"}
        />
      </TouchableOpacity>

      <View style={styles.itemTextContainer}>
        <Text style={[styles.itemName, item.purchased && styles.itemPurchasedText]}>
          {item.name}
        </Text>
        <Text style={styles.itemCategory}>{item.category}</Text>
      </View>

      <TouchableOpacity onPress={() => deleteItem(item.id)} style={styles.deleteButton}>
        <Ionicons name="trash-outline" size={24} color="#F44336" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Text style={styles.headerTitle}>Mercadinho</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Pendentes</Text>
            <Text style={styles.statValue}>{pendingCount}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Comprados</Text>
            <Text style={styles.statValue}>{purchasedCount}</Text>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nome do item..."
            value={name}
            onChangeText={setName}
            onSubmitEditing={addItem}
          />
          <View style={styles.categoriesContainer}>
            {(['Fruta', 'Limpeza', 'Bebida', 'Outro'] as Category[]).map(cat => (
              <TouchableOpacity
                key={cat}
                style={[styles.categoryBadge, category === cat && styles.categoryBadgeSelected]}
                onPress={() => setCategory(cat)}
              >
                <Text style={[styles.categoryBadgeText, category === cat && styles.categoryBadgeTextSelected]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.addButton} onPress={addItem}>
            <Text style={styles.addButtonText}>Adicionar Item</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>Sua Lista</Text>
          {items.length > 0 && (
            <TouchableOpacity onPress={clearList}>
              <Text style={styles.clearText}>Limpar tudo</Text>
            </TouchableOpacity>
          )}
        </View>

        <FlatList
          data={items}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Sua lista de compras está vazia.</Text>
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
