import { useState, useMemo } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, ScrollView, TextInput, Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { PLACES, CATEGORIES, Place, Category } from '../constants/places';
import { Colors } from '../constants/Colors';

type Filter = Category | 'todos';

function StarRating({ rating }: { rating: number }) {
  return (
    <Text style={{ color: Colors.warning, fontSize: 12 }}>
      {'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}
      <Text style={{ color: Colors.textSecondary }}> {rating.toFixed(1)}</Text>
    </Text>
  );
}

function PlaceCard({ place, onPress }: { place: Place; onPress: (p: Place) => void }) {
  const cat = CATEGORIES[place.category];
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(place)} activeOpacity={0.85}>
      <View style={[styles.cardIcon, { backgroundColor: cat.color + '22' }]}>
        <Text style={{ fontSize: 26 }}>{cat.icon}</Text>
      </View>
      <View style={styles.cardContent}>
        <View style={styles.cardRow}>
          <Text style={styles.cardName} numberOfLines={1}>{place.name}</Text>
          <View style={[styles.pill, { backgroundColor: place.openNow ? '#22C55E22' : '#EF444422' }]}>
            <Text style={{ fontSize: 11, fontWeight: '700', color: place.openNow ? Colors.success : Colors.danger }}>
              {place.openNow ? 'Abierto' : 'Cerrado'}
            </Text>
          </View>
        </View>
        <Text style={styles.cardCat}>{cat.label}</Text>
        <Text style={styles.cardAddr} numberOfLines={1}>📍 {place.address}</Text>
        <StarRating rating={place.rating} />
      </View>
    </TouchableOpacity>
  );
}

function DetailModal({ place, onClose }: { place: Place; onClose: () => void }) {
  const cat = CATEGORIES[place.category];
  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modal}>
        <Text style={{ fontSize: 48, textAlign: 'center' }}>{cat.icon}</Text>
        <Text style={styles.modalName}>{place.name}</Text>
        <View style={[styles.pill, { backgroundColor: place.openNow ? '#22C55E22' : '#EF444422', alignSelf: 'center', marginBottom: 12 }]}>
          <Text style={{ color: place.openNow ? Colors.success : Colors.danger, fontWeight: '700' }}>
            {place.openNow ? '● Abierto ahora' : '● Cerrado'}
          </Text>
        </View>
        <Text style={styles.modalDesc}>{place.description}</Text>
        <View style={styles.modalMeta}>
          <Text style={styles.metaLabel}>CATEGORÍA</Text>
          <Text style={styles.metaValue}>{cat.label}</Text>
          <Text style={styles.metaLabel}>DIRECCIÓN</Text>
          <Text style={styles.metaValue}>📍 {place.address}</Text>
          <Text style={styles.metaLabel}>CALIFICACIÓN</Text>
          <StarRating rating={place.rating} />
        </View>
        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <Text style={styles.closeBtnText}>Cerrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState<Filter>('todos');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Place | null>(null);

  const filters: Filter[] = ['todos', 'restaurant', 'cafe', 'parque', 'museo', 'shopping', 'hotel'];

  const filtered = useMemo(() =>
    PLACES.filter((p) => {
      const matchCat = filter === 'todos' || p.category === filter;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    }),
    [filter, search],
  );

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>🗺️ Lugares</Text>
          <Text style={styles.headerSub}>Bogotá, Colombia</Text>
        </View>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{filtered.length}</Text>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar lugares..."
          placeholderTextColor={Colors.textMuted}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Category chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chips}
      >
        {filters.map((f) => {
          const isActive = filter === f;
          const cat = f !== 'todos' ? CATEGORIES[f] : null;
          return (
            <TouchableOpacity
              key={f}
              style={[styles.chip, isActive && { backgroundColor: cat?.color ?? Colors.accent, borderColor: 'transparent' }]}
              onPress={() => setFilter(f)}
              activeOpacity={0.8}
            >
              <Text>{cat ? cat.icon : '🗺️'}</Text>
              <Text style={[styles.chipText, isActive && { color: '#fff' }]}>
                {cat ? cat.label : 'Todos'}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PlaceCard place={item} onPress={setSelected} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Sin resultados</Text>
          </View>
        }
      />

      {/* Detail modal */}
      {selected && <DetailModal place={selected} onClose={() => setSelected(null)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg },

  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 16,
  },
  headerTitle: { fontSize: 24, fontWeight: '800', color: Colors.textPrimary, letterSpacing: -0.5 },
  headerSub: { fontSize: 13, color: Colors.accent, marginTop: 2 },
  countBadge: {
    backgroundColor: Colors.accent, borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 4,
  },
  countText: { color: '#000', fontWeight: '800', fontSize: 14 },

  searchRow: { paddingHorizontal: 16, marginBottom: 8 },
  searchInput: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'web' ? 12 : 10,
    color: Colors.textPrimary,
    fontSize: 15,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  chips: { paddingHorizontal: 16, gap: 8, paddingBottom: 12 },
  chip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: Colors.surface, borderRadius: 20,
    paddingHorizontal: 14, paddingVertical: 8,
    borderWidth: 1, borderColor: Colors.border,
  },
  chipText: { fontSize: 13, fontWeight: '600', color: Colors.textSecondary },

  list: { paddingHorizontal: 16, paddingBottom: 40 },

  card: {
    flexDirection: 'row', gap: 12,
    backgroundColor: Colors.surface,
    borderRadius: 16, padding: 14,
    marginBottom: 10,
    borderWidth: 1, borderColor: Colors.border,
  },
  cardIcon: {
    width: 54, height: 54, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  cardContent: { flex: 1, gap: 3 },
  cardRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  cardName: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary, flex: 1 },
  cardCat: { fontSize: 12, color: Colors.textMuted },
  cardAddr: { fontSize: 12, color: Colors.textSecondary },

  pill: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },

  empty: { alignItems: 'center', paddingTop: 60 },
  emptyText: { color: Colors.textMuted, fontSize: 16 },

  modalOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center', alignItems: 'center',
    padding: 24,
  },
  modal: {
    backgroundColor: Colors.surface,
    borderRadius: 24, padding: 24,
    width: '100%', maxWidth: 420,
    borderWidth: 1, borderColor: Colors.border,
  },
  modalName: { fontSize: 20, fontWeight: '800', color: Colors.textPrimary, textAlign: 'center', marginTop: 8, marginBottom: 8 },
  modalDesc: { fontSize: 14, color: Colors.textSecondary, lineHeight: 22, marginBottom: 16 },
  modalMeta: { gap: 6, marginBottom: 20 },
  metaLabel: { fontSize: 10, color: Colors.textMuted, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase', marginTop: 8 },
  metaValue: { fontSize: 14, color: Colors.textPrimary, fontWeight: '600' },
  closeBtn: {
    backgroundColor: Colors.accent, borderRadius: 12,
    paddingVertical: 14, alignItems: 'center',
  },
  closeBtnText: { color: '#000', fontWeight: '800', fontSize: 16 },
});
