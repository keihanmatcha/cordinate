import React, { useMemo } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';

interface ModelProps {
  topsId: string;
  bottomsId: string;
  shoesId: string;
}

export function AvatarModel({ topsId, bottomsId, shoesId }: ModelProps) {
  // 1. 素体モデルの読み込み
  const { scene: baseScene, animations } = useGLTF('/models/base_body.glb');
  
  // 2. 服パーツの読み込み（実際にはstorageからURLを取得）
  const tops = useGLTF(`/models/items/${topsId}.glb`);
  const bottoms = useGLTF(`/models/items/${bottomsId}.glb`);

  // 3. ボーンの共有処理（UnityのBone Rebindingに相当）
  // 素体のボーン構造をクローンし、そこに服のメッシュを貼り直します
  const bodyMesh = useMemo(() => SkeletonUtils.clone(baseScene), [baseScene]);

  return (
    <group dispose={null}>
      {/* 素体を表示 */}
      <primitive object={bodyMesh} />
      
      {/* 選択されたトップスのメッシュを追加 */}
      {tops && <primitive object={tops.scene} />}
      
      {/* 選択されたボトムスのメッシュを追加 */}
      {bottoms && <primitive object={bottoms.scene} />}
    </group>
  );
}

// モデルを事前にロードしておくための設定
useGLTF.preload('/models/base_body.glb');
