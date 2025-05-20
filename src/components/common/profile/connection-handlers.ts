import { toast } from 'sonner';

export const handleReconnection = async (type: 'tributaria' | 'unica') => {
    const connectionType = type === 'tributaria' ? 'clave tributaria' : 'clave única';

    // Simular proceso
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast.success(
        `Estado de conexión a la Dirección del Trabajo (${connectionType}) actualizado correctamente`,
        {
            duration: 4000,
        }
    );
};

export const handleNewConnection = async (type: 'tributaria' | 'unica') => {
    const connectionType = type === 'tributaria' ? 'clave tributaria' : 'clave única';

    await new Promise(resolve => setTimeout(resolve, 2000));

    toast.success(
        `Estado de conexión a la Dirección del Trabajo (${connectionType}) actualizado correctamente`,
        {
            duration: 4000,
        }
    );
};