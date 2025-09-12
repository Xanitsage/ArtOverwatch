import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { type Entity } from "@shared/schema";

interface EntityContextType {
  selectedEntity: Entity | null;
  setSelectedEntity: (entity: Entity) => void;
  entities: Entity[];
  isLoading: boolean;
}

const EntityContext = createContext<EntityContextType | undefined>(undefined);

interface EntityProviderProps {
  children: ReactNode;
}

export function EntityProvider({ children }: EntityProviderProps) {
  const [selectedEntity, setSelectedEntityState] = useState<Entity | null>(null);
  
  const { data: entities = [], isLoading } = useQuery<Entity[]>({
    queryKey: ["/api/entities"],
  });

  // Load selected entity from localStorage on mount
  useEffect(() => {
    const savedEntityId = localStorage.getItem("selectedEntityId");
    if (savedEntityId && entities.length > 0) {
      const entity = entities.find(e => e.id === savedEntityId);
      if (entity) {
        setSelectedEntityState(entity);
      } else {
        // Default to first entity if saved entity not found
        setSelectedEntityState(entities[0]);
      }
    } else if (entities.length > 0 && !selectedEntity) {
      // Default to first entity if none selected
      setSelectedEntityState(entities[0]);
    }
  }, [entities, selectedEntity]);

  const setSelectedEntity = (entity: Entity) => {
    setSelectedEntityState(entity);
    localStorage.setItem("selectedEntityId", entity.id);
  };

  const value: EntityContextType = {
    selectedEntity,
    setSelectedEntity,
    entities,
    isLoading,
  };

  return (
    <EntityContext.Provider value={value}>
      {children}
    </EntityContext.Provider>
  );
}

export function useEntity() {
  const context = useContext(EntityContext);
  if (context === undefined) {
    throw new Error("useEntity must be used within an EntityProvider");
  }
  return context;
}