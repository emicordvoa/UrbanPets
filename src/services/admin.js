import { supabase } from '../lib/supabaseClient.js';

// ========== SERVICIOS ==========
export const obtenerServicios = async () => {
  try {
    const { data, error } = await supabase.from('servicios').select('*').order('titulo');
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error obtenerServicios:', error);
    return { data: null, error };
  }
};

export const crearServicio = async (servicio) => {
  try {
    const { data, error } = await supabase
      .from('servicios')
      .insert([servicio])
      .select('id')
      .single();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error crearServicio:', error);
    return { data: null, error };
  }
};

export const actualizarServicio = async (id, updates) => {
  try {
    const { data, error } = await supabase
      .from('servicios')
      .update(updates)
      .eq('id', id)
      .select('id')
      .single();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error actualizarServicio:', error);
    return { data: null, error };
  }
};

export const eliminarODesactivarServicio = async (id) => {
  try {
    const { data: pedidos, error: pedidoError } = await supabase
      .from('pedido_detalle')
      .select('id')
      .eq('servicio_id', id)
      .limit(1);
    if (pedidoError) throw pedidoError;
    if (pedidos && pedidos.length > 0) {
      const { data, error } = await supabase
        .from('servicios')
        .update({ activo: false })
        .eq('id', id)
        .select('id')
        .single();
      if (error) throw error;
      return { data: { ...data, desactivado: true }, error: null };
    }
    const { error } = await supabase.from('servicios').delete().eq('id', id);
    if (error) throw error;
    return { data: { eliminado: true }, error: null };
  } catch (error) {
    console.error('Error eliminarODesactivarServicio:', error);
    return { data: null, error };
  }
};

// ========== CATEGORIAS ==========
export const obtenerCategorias = async () => {
  try {
    const { data, error } = await supabase.from('categorias').select('*').order('nombre');
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error obtenerCategorias:', error);
    return { data: null, error };
  }
};

export const crearCategoria = async (categoria) => {
  try {
    const { data, error } = await supabase
      .from('categorias')
      .insert([categoria])
      .select('id')
      .single();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error crearCategoria:', error);
    return { data: null, error };
  }
};

export const actualizarCategoria = async (id, updates) => {
  try {
    const { data, error } = await supabase
      .from('categorias')
      .update(updates)
      .eq('id', id)
      .select('id')
      .single();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error actualizarCategoria:', error);
    return { data: null, error };
  }
};

export const eliminarCategoria = async (id) => {
  try {
    const { data: servicios, error: servError } = await supabase
      .from('servicios')
      .select('id')
      .eq('categoria_id', id)
      .limit(1);
    if (servError) throw servError;
    if (servicios && servicios.length > 0) {
      throw new Error('No se puede eliminar. La categoría tiene servicios asociados.');
    }
    const { data, error } = await supabase.from('categorias').delete().eq('id', id);
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error eliminarCategoria:', error);
    return { data: null, error };
  }
};

// ========== PEDIDOS ==========
export const obtenerPedidosConDetalle = async () => {
  try {
    const { data: pedidos, error: pedidosError } = await supabase
      .from('pedidos')
      .select(
        `
        id,
        cliente_id,
        mascota_id,
        fecha_preferida,
        hora_preferida,
        total,
        estado,
        creado_en,
        clientes(nombre, correo, telefono),
        mascotas(nombre, raza, edad, peso),
        pedido_detalle(
          id,
          servicio_id,
          cantidad,
          precio_unitario,
          subtotal,
          servicios(titulo)
        )
      `
      )
      .order('creado_en', { ascending: false });
    if (pedidosError) throw pedidosError;
    return { data: pedidos, error: null };
  } catch (error) {
    console.error('Error obtenerPedidosConDetalle:', error);
    return { data: null, error };
  }
};

export const obtenerDetallePedido = async (pedidoId) => {
  try {
    const { data: pedido, error: pedidoError } = await supabase
      .from('pedidos')
      .select(
        `
        id,
        cliente_id,
        mascota_id,
        fecha_preferida,
        hora_preferida,
        mensaje,
        total,
        estado,
        creado_en,
        clientes(nombre, correo, telefono),
        mascotas(nombre, raza, edad, peso),
        pedido_detalle(
          id,
          servicio_id,
          cantidad,
          precio_unitario,
          subtotal,
          servicios(titulo)
        )
      `
      )
      .eq('id', pedidoId)
      .single();
    if (pedidoError) throw pedidoError;
    return { data: pedido, error: null };
  } catch (error) {
    console.error('Error obtenerDetallePedido:', error);
    return { data: null, error };
  }
};

export const actualizarEstadoPedido = async (id, estado) => {
  try {
    const { data, error } = await supabase
      .from('pedidos')
      .update({ estado })
      .eq('id', id)
      .select('id')
      .single();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error actualizarEstadoPedido:', error);
    return { data: null, error };
  }
};

// ========== PUBLICACIONES ==========
export const obtenerPublicaciones = async (incluirInactivas = true) => {
  try {
    let query = supabase.from('publicaciones').select('*').order('creado_en', { ascending: false });
    if (!incluirInactivas) {
      query = query.eq('activo', true);
    }
    const { data, error } = await query;
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error obtenerPublicaciones:', error);
    return { data: null, error };
  }
};

export const crearPublicacion = async (publicacion) => {
  try {
    const { data, error } = await supabase
      .from('publicaciones')
      .insert([publicacion])
      .select('id')
      .single();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error crearPublicacion:', error);
    return { data: null, error };
  }
};

export const actualizarPublicacion = async (id, updates) => {
  try {
    const { data, error } = await supabase
      .from('publicaciones')
      .update(updates)
      .eq('id', id)
      .select('id')
      .single();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error actualizarPublicacion:', error);
    return { data: null, error };
  }
};

export const eliminarPublicacion = async (id) => {
  try {
    const { data, error } = await supabase.from('publicaciones').delete().eq('id', id);
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error eliminarPublicacion:', error);
    return { data: null, error };
  }
};

// ========== ESTADÍSTICAS ==========
export const obtenerUsuarios = async () => {
  try {
    const { data, error } = await supabase.from('usuarios').select('*').order('creado_en', { ascending: false });
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error obtenerUsuarios:', error);
    return { data: null, error };
  }
};

export const actualizarUsuario = async (id, updates) => {
  try {
    const { data, error } = await supabase.from('usuarios').update(updates).eq('id', id).select('id').single();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error actualizarUsuario:', error);
    return { data: null, error };
  }
};

export const crearUsuario = async (usuario) => {
  try {
    const { data, error } = await supabase
      .from('usuarios')
      .insert([usuario])
      .select('id')
      .single();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error crearUsuario:', error);
    return { data: null, error };
  }
};

export const eliminarUsuario = async (id) => {
  try {
    const { error } = await supabase.from('usuarios').delete().eq('id', id);
    if (error) throw error;
    return { data: { eliminado: true }, error: null };
  } catch (error) {
    console.error('Error eliminarUsuario:', error);
    return { data: null, error };
  }
};

export const obtenerClientes = async () => {
  try {
    const { data, error } = await supabase
      .from('clientes')
      .select('*, mascotas(id, nombre, raza), pedidos(id, estado, total, creado_en)')
      .order('creado_en', { ascending: false });
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error obtenerClientes:', error);
    return { data: null, error };
  }
};

export const obtenerMascotas = async () => {
  try {
    const { data, error } = await supabase
      .from('mascotas')
      .select('*, clientes(nombre, correo, telefono)')
      .order('creado_en', { ascending: false });
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error obtenerMascotas:', error);
    return { data: null, error };
  }
};

export const obtenerEstadisticasAdmin = async () => {
  try {
    const [
      { count: serviciosCount },
      { count: categoriasCount },
      { count: pedidosCount },
      { count: clientesCount },
      { data: ultimosPedidos }
    ] = await Promise.all([
      supabase.from('servicios').select('id', { count: 'exact', head: true }),
      supabase.from('categorias').select('id', { count: 'exact', head: true }),
      supabase.from('pedidos').select('id', { count: 'exact', head: true }),
      supabase.from('clientes').select('id', { count: 'exact', head: true }),
      supabase
        .from('pedidos')
        .select('id, clientes(nombre), mascotas(nombre), estado, creado_en')
        .order('creado_en', { ascending: false })
        .limit(5)
    ]);

    return {
      data: {
        serviciosCount: serviciosCount || 0,
        categoriasCount: categoriasCount || 0,
        pedidosCount: pedidosCount || 0,
        clientesCount: clientesCount || 0,
        ultimosPedidos
      },
      error: null
    };
  } catch (error) {
    console.error('Error obtenerEstadisticasAdmin:', error);
    return { data: null, error };
  }
};
